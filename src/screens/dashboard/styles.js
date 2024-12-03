import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },
    globalStatsContainer: {
        padding: 16,
        margin: 16,
        backgroundColor: 'rgba(30, 30, 47, 0.9)',
        borderRadius: 12,
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    backgroundImageStyle: {
        opacity: 0.4,
        resizeMode: 'cover',
    },
    statsHeader: {
        color: '#8A2BE2',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statsText: {
        color: '#FFFFFF',
        fontSize: 16,
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
        color: '#8A2BE2',
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
