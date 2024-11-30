import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        padding: 20,
    },
    topSection: {
        alignItems: 'center',
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
    marketList: {
        marginTop: 20,
    },
    marketTile: {
        flex: 1,
        backgroundColor: '#1F1F1F',
        padding: 15,
        margin: 5,
        borderRadius: 8,
    },
    marketName: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 5,
    },
    marketPrice: {
        color: '#BB86FC',
        fontSize: 14,
        marginBottom: 5,
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
