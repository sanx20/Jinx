import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CoinDetailScreen({ route }) {
    const { coinId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Details for {coinId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
    },
    header: {
        fontSize: 24,
        color: '#BB86FC',
        fontWeight: 'bold',
    },
});
