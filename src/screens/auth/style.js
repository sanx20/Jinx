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
        fontSize: 28,
        color: '#8A2BE2',
        marginBottom: 20,
        textShadowColor: '#483D8B',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#8A2BE2',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: '#FFFFFF',
        backgroundColor: '#1F1F1F',
    },
    actionButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#8A2BE2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    toggleText: {
        color: '#8A2BE2',
        marginTop: 20,
        fontSize: 16,
    },
});
