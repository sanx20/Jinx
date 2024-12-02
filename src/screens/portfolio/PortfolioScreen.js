import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from '../../redux/slices/PortfolioSlice';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { useIsFocused } from '@react-navigation/native';

export default function PortfolioScreen({ navigation }) {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const userId = FIREBASE_AUTH.currentUser?.uid;
    const { portfolio, balance, status, error } = useSelector((state) => state.portfolio);

    useEffect(() => {
        if (isFocused && userId) {
            dispatch(fetchPortfolio(userId));
        }
    }, [isFocused, dispatch, userId]);

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

    const handleCoinPress = (coin) => {
        navigation.navigate('CoinDetail', { coinId: coin.id });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.balance}>Balance: ${balance.toLocaleString()}</Text>
            <FlatList
                data={Object.values(portfolio)}
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.coinContainer}
                        onPress={() => handleCoinPress(item)}
                    >
                        <Text style={styles.coinName}>
                            {item.name} ({item.symbol})
                        </Text>
                        <Text style={styles.coinDetails}>Quantity: {item.quantity}</Text>
                        <Text style={styles.coinDetails}>
                            Purchase Price: ${parseFloat(item.purchasePrice).toLocaleString()}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0D0D0D',
    },
    balance: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    coinContainer: {
        backgroundColor: '#1E1E1E',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    coinName: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    coinDetails: {
        color: '#A0A0A0',
    },
    errorText: {
        color: '#FF5252',
        fontSize: 16,
        textAlign: 'center',
    },
});
