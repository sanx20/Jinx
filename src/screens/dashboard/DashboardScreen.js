import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketData } from '../../redux/slices/CoinSlice';
import { fetchGlobalStats } from '../../redux/slices/GlobalSlice';
import CoinCard from '../../components/coin_card/CoinCard';
import styles from './styles';

export default function DashboardScreen({ navigation }) {
    const dispatch = useDispatch();

    const {
        marketData,
        status: marketStatus,
        isFetchingMore,
        hasNextPage,
        start,
        limit,
        error: marketError,
    } = useSelector((state) => state.coins);

    const { globalStats, status: globalStatus, error: globalError } = useSelector((state) => state.global);

    useEffect(() => {
        if (marketStatus === 'idle') {
            dispatch(fetchMarketData({ start: 0, limit }));
        }
        if (globalStatus === 'idle') {
            dispatch(fetchGlobalStats());
        }
    }, [dispatch, marketStatus, globalStatus, limit]);

    const loadMoreData = () => {
        if (!isFetchingMore && hasNextPage) {
            dispatch(fetchMarketData({ start, limit }));
        }
    };

    const renderFooter = () => {
        if (isFetchingMore) {
            return (
                <View style={styles.loadingFooter}>
                    <ActivityIndicator size="small" color="#BB86FC" />
                </View>
            );
        }

        if (!hasNextPage) {
            return (
                <View style={styles.noMoreData}>
                    <Text style={styles.noMoreDataText}>No more data to load</Text>
                </View>
            );
        }

        return null;
    };

    const renderItem = ({ item }) => (
        <CoinCard
            coin={{
                name: item.name,
                symbol: item.symbol,
                price_usd: item.price_usd,
                percent_change_24h: item.percent_change_24h,
                image: `https://www.coinlore.com/img/25x25/${item.nameid}.png`,
            }}
            onPress={() => navigation.navigate('CoinDetail', { coinId: item.id })}
        />
    );

    return (
        <View style={styles.container}>
            {globalStatus === 'loading' ? (
                <ActivityIndicator size="large" color="#BB86FC" />
            ) : globalError ? (
                <Text style={styles.errorText}>Error: {globalError}</Text>
            ) : (
                globalStats && (
                    <View style={styles.globalStats}>
                        <Text style={styles.statsText}>Total Coins: {globalStats.coins_count}</Text>
                        <Text style={styles.statsText}>
                            Market Cap: ${parseFloat(globalStats.total_mcap).toLocaleString()}
                        </Text>
                        <Text style={styles.statsText}>BTC Dominance: {globalStats.btc_d}%</Text>
                    </View>
                )
            )}

            {marketStatus === 'loading' && marketData.length === 0 ? (
                <ActivityIndicator size="large" color="#BB86FC" />
            ) : marketError ? (
                <Text style={styles.errorText}>Error: {marketError}</Text>
            ) : (
                <FlatList
                    data={marketData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            )}
        </View>
    );
}