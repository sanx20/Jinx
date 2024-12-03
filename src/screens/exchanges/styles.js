import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    headerContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#1F1B24',
        borderRadius: 8,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chart: {
        marginBottom: 20,
        borderRadius: 8,
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#1F1B24',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
    },
    exchangeName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    exchangeInfo: {
        color: '#B0B0B0',
        fontSize: 14,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    errorText: {
        color: '#BB86FC',
        marginBottom: 10,
        fontSize: 16,
    },
    retryText: {
        color: '#FFFFFF',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    searchBar: {
        backgroundColor: '#1F1B24',
        color: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    sortButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sortButton: {
        backgroundColor: '#BB86FC',
        padding: 10,
        borderRadius: 8,
    },
    sortButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});
