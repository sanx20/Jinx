import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinDetails } from '../../redux/slices/CoinSlice';
import { LineChart } from 'react-native-chart-kit';

export default function CoinDetailScreen({ route }) {
    const { coinId } = route.params;
    const dispatch = useDispatch();
    const { coinDetails, status, error } = useSelector((state) => state.coins);

    useEffect(() => {
        dispatch(fetchCoinDetails(coinId));
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

    const chartData = {
        labels: ['Yesterday', 'Today'],
        datasets: [
            {
                data: [
                    parseFloat(coinDetails.price_usd) * 0.9,
                    parseFloat(coinDetails.price_usd),
                ],
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
                ${parseFloat(coinDetails.price_usd).toLocaleString()}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        padding: 20,
    },
    coinName: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 22,
        color: '#BB86FC',
        marginBottom: 10,
    },
    marketCap: {
        fontSize: 16,
        color: '#A0A0A0',
        marginBottom: 10,
    },
    change: {
        fontSize: 16,
        color: '#4CAF50',
        marginBottom: 20,
    },
    graphContainer: {
        marginTop: 20,
    },
    chart: {
        borderRadius: 16,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
    },
});
