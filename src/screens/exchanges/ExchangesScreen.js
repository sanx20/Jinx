import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchanges } from '../../redux/slices/ExchangesSlice';

export default function ExchangesScreen({ navigation }) {
    const dispatch = useDispatch();
    const { exchanges, status, error } = useSelector((state) => state.exchanges);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExchanges());
        }
    }, [dispatch, status]);

    const renderExchangeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.exchangeCard}
            onPress={() => navigation.navigate('ExchangeDetails', { exchangeId: item.id })}
        >
            <View>
                <Text style={styles.exchangeName}>{item.name}</Text>
                <Text style={styles.exchangeVolume}>
                    Volume (USD): ${parseFloat(item.volume_usd).toLocaleString()}
                </Text>
                <Text style={styles.exchangePairs}>Active Pairs: {item.active_pairs}</Text>
                <Text style={styles.exchangeCountry}>Country: {item.country || 'Unknown'}</Text>
            </View>
        </TouchableOpacity>
    );

    if (status === 'loading') {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#BB86FC" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={exchanges}
            renderItem={renderExchangeItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
    },
    list: {
        padding: 16,
    },
    exchangeCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
    },
    exchangeName: {
        fontSize: 16,
        color: '#BB86FC',
        fontWeight: 'bold',
    },
    exchangeVolume: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    exchangePairs: {
        fontSize: 14,
        color: '#A0A0A0',
    },
    exchangeCountry: {
        fontSize: 12,
        color: '#A0A0A0',
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
    },
});
