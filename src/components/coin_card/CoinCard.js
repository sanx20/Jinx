import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import styles from './styles';

export default function CoinCard({ coin, onPress }) {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        onPress();
    };

    const currentPrice = parseFloat(coin.price_usd || 0);
    const priceChange24h = parseFloat(coin.percent_change_24h || 0);

    return (
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
                style={styles.touchable}
            >
                <Image
                    source={{ uri: coin.image || 'https://via.placeholder.com/50x50?text=?"' }}
                    style={styles.coinImage}
                />
                <View style={styles.coinDetails}>
                    <Text style={styles.coinName}>{coin.name}</Text>
                    <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                    <Text style={styles.coinPrice}>
                        ${currentPrice.toLocaleString()}
                    </Text>
                    <Text
                        style={[
                            styles.priceChange,
                            priceChange24h >= 0 ? styles.positiveChange : styles.negativeChange,
                        ]}
                    >
                        {priceChange24h >= 0 ? '+' : ''}
                        {priceChange24h.toFixed(2)}%
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
