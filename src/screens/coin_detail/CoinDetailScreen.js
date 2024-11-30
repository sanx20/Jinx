import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinDetails, fetchCoinMarkets } from '../../redux/slices/CoinSlice';
import { fetchCandleData } from '../../redux/slices/CandleSlice';
import CandleChart from '../../components/candle_chart/CandleChart';
import styles from './styles';

export default function CoinDetailScreen({ route }) {
    const { coinId } = route.params;
    const dispatch = useDispatch();

    const { coinDetails, markets, status, error } = useSelector((state) => state.coins);
    const { candleData, candleStatus, candleError } = useSelector((state) => state.candles);

    useEffect(() => {
        dispatch(fetchCoinDetails(coinId));
        dispatch(fetchCoinMarkets(coinId));
        const intervalId = setInterval(() => {
            dispatch(fetchCandleData(coinId));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [dispatch, coinId]);

    const isLoading = status === 'loading' || candleStatus === 'loading';
    const hasError = error || candleError;

    const currentPrice = parseFloat(coinDetails?.price_usd || 0);
    const marketCap = parseFloat(coinDetails?.market_cap_usd || 0).toLocaleString();
    const percentChange24h = parseFloat(coinDetails?.percent_change_24h || 0).toFixed(2);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#BB86FC" />
            </View>
        );
    }

    if (hasError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    {error || candleError || 'An error occurred'}
                </Text>
            </View>
        );
    }

    if (!coinDetails) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No coin details available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.coinName}>
                    {coinDetails?.name || 'N/A'} ({coinDetails?.symbol || 'N/A'})
                </Text>
                <Text style={styles.price}>${currentPrice.toLocaleString()}</Text>
                <Text style={styles.marketCap}>Market Cap: ${marketCap}</Text>
                <Text style={styles.change}>24h Change: {percentChange24h}%</Text>
            </View>

            <CandleChart data={candleData || []} />

            <FlatList
                data={markets || []}
                numColumns={2}
                keyExtractor={(item, index) => `${item?.name}-${index}`}
                contentContainerStyle={styles.marketList}
                renderItem={({ item }) => (
                    <View style={styles.marketTile}>
                        <Text style={styles.marketName}>{item?.name || 'N/A'}</Text>
                        <Text style={styles.marketPrice}>
                            ${parseFloat(item?.price_usd || 0).toLocaleString()}
                        </Text>
                        <Text style={styles.marketVolume}>
                            Vol: ${parseFloat(item?.volume_usd || 0).toLocaleString()}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
