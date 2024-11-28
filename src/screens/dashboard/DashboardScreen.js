import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CoinCard from '../../components/coin_card/CoinCard';

const sampleData = [
    {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
        current_price: 95957,
        price_change_percentage_24h: 4.26856,
        market_cap: 1901474345578,
    },
    {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
        current_price: 3645.95,
        price_change_percentage_24h: 9.7102,
        market_cap: 439918619639,
    },
];

export default function DashboardScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <CoinCard
            coin={item}
            onPress={() => navigation.navigate('CoinDetail', { coinId: item.id })}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sampleData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
    },
    list: {
        paddingHorizontal: 16,
    },
});
