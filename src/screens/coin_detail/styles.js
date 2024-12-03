import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#121212', 
    },
    topSection: {
        backgroundColor: '#1F1F2E',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    coinName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        color: '#BB86FC',
        marginBottom: 20,
    },
    marketCap: {
        fontSize: 16,
        color: '#A0A0A0',
        marginBottom: 10,
    },
    change: {
        fontSize: 16,
        marginBottom: 20,
    },
    positiveChange: {
        color: '#4CAF50',
    },
    negativeChange: {
        color: '#FF5252',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 10,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buyButton: {
        backgroundColor: '#4CAF50',
    },
    sellButton: {
        backgroundColor: '#FF5252',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    marketList: {
        marginTop: 20,
    },
    marketTile: {
        flex: 1,
        backgroundColor: '#2A2A3E',
        padding: 15,
        margin: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.7,
        shadowRadius: 6,
    },
    marketName: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 5,
    },
    marketPrice: {
        color: '#BB86FC',
        fontSize: 14,
    },
    marketVolume: {
        color: '#A0A0A0',
        fontSize: 14,
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#1F1F2E',
        padding: 20,
        borderRadius: 10,
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
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    cancelButton: {
        backgroundColor: '#FF5252',
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
