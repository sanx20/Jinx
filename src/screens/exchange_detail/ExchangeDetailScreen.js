import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function ExchangeDetailScreen({ route }) {
    const { exchangeId } = route.params;

    useEffect(() => {
        console.log(`Fetch details for exchange ID: ${exchangeId}`);
    }, [exchangeId]);

    return (
        <View style={styles.container}>
            <Text style={styles.detailText}>Details for Exchange ID: {exchangeId}</Text>
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
    detailText: {
        fontSize: 18,
        color: '#BB86FC',
    },
});
