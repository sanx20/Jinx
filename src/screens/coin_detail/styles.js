import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        padding: 20,
    },
    topSection: {
        alignItems: 'center',
        marginBottom: 20,
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
    balance: {
        fontSize: 16,
        color: '#A0A0A0',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        width: '80%',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#1F1F1F',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#2C2C2C',
        color: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
