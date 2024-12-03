import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
