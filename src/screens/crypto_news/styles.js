import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
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
        color: '#FF3E4D',
        marginBottom: 10,
        fontSize: 16,
    },
    retryText: {
        color: '#BB86FC',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    searchBar: {
        backgroundColor: '#1F1B24',
        color: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        borderColor: '#BB86FC',
        borderWidth: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    filterButton: {
        backgroundColor: '#1F1B24',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#8A2BE2',
    },
    filterButtonActive: {
        backgroundColor: '#8A2BE2',
        padding: 12,
        borderRadius: 8,
    },
    filterText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
    },
    newsList: {
        paddingBottom: 20,
    },
    newsItem: {
        backgroundColor: '#1E1E2F',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: '#BB86FC',
        borderWidth: 1,
    },
    title: {
        color: '#BB86FC',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    source: {
        color: '#B0B0B0',
        fontSize: 14,
        marginBottom: 5,
    },
    panicScore: {
        color: '#FF3E4D',
        fontSize: 14,
    },
});
