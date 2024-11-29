import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinDetails, fetchCoinMarkets } from '../../redux/slices/CoinSlice';
import { LineChart } from 'react-native-chart-kit';
import styles from './styles';

export default function CoinDetailScreen({ route }) {
    const { coinId } = route.params;
    const dispatch = useDispatch();
    const { coinDetails, markets, status, error } = useSelector((state) => state.coins);

    useEffect(() => {
        dispatch(fetchCoinDetails(coinId));
        dispatch(fetchCoinMarkets(coinId));
    }, [dispatch, coinId]);

    if (status === 'loading') {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#BB86FC" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!coinDetails) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No data available</Text>
            </View>
        );
    }

    const currentPrice = parseFloat(coinDetails.price_usd || 0);
    const price24hAgo = currentPrice / (1 + parseFloat(coinDetails.percent_change_24h || 0) / 100);
    const price1hAgo = currentPrice / (1 + parseFloat(coinDetails.percent_change_1h || 0) / 100);
    const price7dAgo = currentPrice / (1 + parseFloat(coinDetails.percent_change_7d || 0) / 100);

    const chartData = {
        labels: ['7d Ago', '24h Ago', '1h Ago', 'Now'],
        datasets: [
            {
                data: [price7dAgo, price24hAgo, price1hAgo, currentPrice],
                color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
            },
        ],
        legend: [`Price of ${coinDetails.symbol}`],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.coinName}>
                {coinDetails.name} ({coinDetails.symbol})
            </Text>
            <Text style={styles.price}>
                ${currentPrice.toLocaleString()}
            </Text>
            <Text style={styles.marketCap}>
                Market Cap: ${parseFloat(coinDetails.market_cap_usd).toLocaleString()}
            </Text>
            <Text style={styles.change}>
                24h Change: {parseFloat(coinDetails.percent_change_24h).toFixed(2)}%
            </Text>

            <View style={styles.graphContainer}>
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1E1E1E',
                        backgroundGradientFrom: '#1E1E1E',
                        backgroundGradientTo: '#0D0D0D',
                        color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: '5',
                            strokeWidth: '2',
                            stroke: '#BB86FC',
                        },
                    }}
                    bezier
                    style={styles.chart}
                />
            </View>

            <FlatList
                data={markets}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                contentContainerStyle={styles.marketList}
                renderItem={({ item }) => (
                    <View style={styles.marketRow}>
                        <Text style={styles.marketName}>{item.name}</Text>
                        <Text style={styles.marketPrice}>
                            ${parseFloat(item.price_usd).toLocaleString()}
                        </Text>
                        <Text style={styles.marketVolume}>
                            Vol: ${parseFloat(item.volume_usd).toLocaleString()}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}