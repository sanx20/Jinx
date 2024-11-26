import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    header: {
        fontSize: 26,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#BB86FC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: '#FFFFFF',
        backgroundColor: '#1F1F1F',
    },
    toggleText: {
        color: '#BB86FC',
        marginTop: 20,
        fontSize: 16,
    },
});
