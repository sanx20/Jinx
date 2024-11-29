import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    marketList: {
        marginTop: 20,
    },
    marketRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    marketName: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    marketPrice: {
        color: '#BB86FC',
        fontSize: 14,
    },
    marketVolume: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
    },
});
