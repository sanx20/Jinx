import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function CoinCard({ coin, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: coin.image }} style={styles.coinImage} />
            <View style={styles.coinDetails}>
                <Text style={styles.coinName}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                </Text>
                <Text style={styles.coinPrice}>${coin.current_price.toLocaleString()}</Text>
                <Text
                    style={[
                        styles.priceChange,
                        coin.price_change_percentage_24h >= 0
                            ? styles.positiveChange
                            : styles.negativeChange,
                    ]}
                >
                    {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </Text>
                <Text style={styles.marketCap}>
                    Market Cap: ${coin.market_cap.toLocaleString()}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
