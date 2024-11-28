import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketData } from '../../redux/slices/CoinSlice';
import CoinCard from '../../components/coin_card/CoinCard';

export default function DashboardScreen({ navigation }) {
    const dispatch = useDispatch();
    const { marketData, status, isFetchingMore, hasNextPage, start, limit, error } = useSelector(
        (state) => state.coins
    );

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMarketData({ start: 0, limit }));
        }
    }, [dispatch, status, limit]);

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
            {status === 'loading' && marketData.length === 0 ? (
                <ActivityIndicator size="large" color="#BB86FC" />
            ) : error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },
    loadingFooter: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    noMoreData: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    noMoreDataText: {
        color: '#BB86FC',
        fontSize: 12,
        marginTop: 5,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
