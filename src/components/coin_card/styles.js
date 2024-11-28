import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 16,
        marginBottom: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
    },
    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    coinSymbol: {
        fontSize: 12,
        color: '#A0A0A0',
        marginTop: 2,
    },
    coinPrice: {
        fontSize: 16,
        color: '#BB86FC',
        marginTop: 8,
    },
    priceChange: {
        fontSize: 14,
        marginTop: 4,
        fontWeight: '600',
    },
    positiveChange: {
        color: '#4CAF50',
    },
    negativeChange: {
        color: '#FF5252',
    },
});
