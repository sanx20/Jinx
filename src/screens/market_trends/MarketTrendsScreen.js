import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MarketTrendsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Market Trends</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    header: {
        fontSize: 24,
        color: '#BB86FC',
        fontWeight: 'bold',
    },
});
