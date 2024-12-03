import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0D0D0D',
    },
    balanceContainer: {
        backgroundColor: '#1E1E2F',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    balanceTitle: {
        fontSize: 16,
        color: '#A0A0A0',
    },
    balanceValue: {
        fontSize: 24,
        color: '#BB86FC',
        fontWeight: 'bold',
        marginTop: 5,
    },
    listContainer: {
        paddingBottom: 20,
    },
    coinContainer: {
        backgroundColor: '#1E1E2F',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    coinName: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    coinDetails: {
        fontSize: 14,
        color: '#A0A0A0',
        marginVertical: 2,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#A0A0A0',
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#8A2BE2',
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

});
