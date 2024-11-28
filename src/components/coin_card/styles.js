import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    coinImage: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#BB86FC',
    },
    coinDetails: {
        flex: 1,
    },
    coinName: {
        fontSize: 18,
        color: '#E6E6E6',
        fontWeight: 'bold',
    },
    coinPrice: {
        fontSize: 16,
        color: '#BB86FC',
        marginTop: 4,
    },
    priceChange: {
        fontSize: 14,
        marginTop: 4,
    },
    positiveChange: {
        color: '#4CAF50',
    },
    negativeChange: {
        color: '#FF5252',
    },
    marketCap: {
        fontSize: 12,
        color: '#B0B0B0',
        marginTop: 4,
    },
});
