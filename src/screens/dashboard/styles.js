import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },
    globalStats: {
        padding: 16,
        margin: 16,
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
    },
    statsText: {
        color: '#BB86FC',
        fontSize: 14,
        marginBottom: 8,
    },
    loadingFooter: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    noMoreData: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    noMoreDataText: {
        color: '#BB86FC',
        fontSize: 12,
        marginTop: 5,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
