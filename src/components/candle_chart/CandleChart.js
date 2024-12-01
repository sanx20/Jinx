import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const CandleChart = ({ data }) => {
    const screenWidth = Dimensions.get('window').width;
    const chartHeight = 300;
    const chartWidth = screenWidth - 60;

    const validData = data.map((d) => ({
        high: parseFloat(d.high) || 0,
        low: parseFloat(d.low) || 0,
        open: parseFloat(d.open) || 0,
        close: parseFloat(d.close) || 0,
        time: d.time || '',
    }));

    const maxPrice = Math.max(...validData.map((d) => d.high));
    const minPrice = Math.min(...validData.map((d) => d.low));
    const priceRange = maxPrice - minPrice || 1;

    const renderYAxis = () => {
        const step = priceRange / 4;
        return Array.from({ length: 5 }, (_, i) => (
            <Text key={i} style={styles.yAxisLabel}>
                {(maxPrice - i * step).toFixed(2)}
            </Text>
        ));
    };

    return (
        <View style={styles.chartContainer}>
            <View style={styles.chartArea}>
                <View style={styles.yAxis}>{renderYAxis()}</View>
                <View style={[styles.chart, { width: chartWidth, height: chartHeight }]}>
                    {validData.map((candle, index) => {
                        const isBullish = candle.close > candle.open;
                        const barHeight =
                            ((candle.high - candle.low) / priceRange) * chartHeight;
                        const candleHeight =
                            (Math.abs(candle.open - candle.close) / priceRange) * chartHeight;
                        const topOffset =
                            ((maxPrice - candle.high) / priceRange) * chartHeight;

                        return (
                            <View
                                key={index}
                                style={[
                                    styles.candleContainer,
                                    { left: (index / validData.length) * chartWidth },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.wick,
                                        {
                                            height: barHeight,
                                            top: topOffset,
                                            backgroundColor: isBullish ? '#4CAF50' : '#FF5252',
                                        },
                                    ]}
                                />
                                <View
                                    style={[
                                        styles.candle,
                                        {
                                            height: candleHeight,
                                            top:
                                                ((maxPrice -
                                                    Math.max(candle.open, candle.close)) /
                                                    priceRange) *
                                                chartHeight,
                                            backgroundColor: isBullish ? '#4CAF50' : '#FF5252',
                                        },
                                    ]}
                                />
                                <Text style={styles.candleLabel}>
                                    {candle.close.toFixed(2)}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            <View style={styles.xAxis}>
                {validData.map((candle, index) => (
                    <Text key={index} style={styles.xAxisLabel}>
                        {candle.time}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    chartArea: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    yAxis: {
        justifyContent: 'space-between',
        height: 300,
    },
    yAxisLabel: {
        color: '#A0A0A0',
        fontSize: 12,
    },
    chart: {
        backgroundColor: '#1E1E1E',
        position: 'relative',
        overflow: 'hidden',
    },
    candleContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    wick: {
        width: 2,
    },
    candle: {
        width: 10,
        position: 'absolute',
    },
    candleLabel: {
        color: '#FFFFFF',
        fontSize: 10,
        position: 'absolute',
        top: -15,
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
    },
    xAxisLabel: {
        color: '#A0A0A0',
        fontSize: 10,
        width: 30,
        textAlign: 'center',
    },
});

export default CandleChart;
