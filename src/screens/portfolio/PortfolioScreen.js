import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from '../../redux/slices/PortfolioSlice';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';

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

    const handleLogout = () => {
        FIREBASE_AUTH.signOut();
    };

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

    const portfolioItems = portfolio ? Object.values(portfolio) : [];
    if (portfolioItems.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Your portfolio is empty. Start investing!</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceTitle}>Portfolio Balance</Text>
                <Text style={styles.balanceValue}>
                    ${!isNaN(balance) ? balance.toLocaleString() : '0.00'}
                </Text>
            </View>
            <FlatList
                data={portfolioItems}
                keyExtractor={(item) => item.symbol}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.coinContainer}
                        onPress={() => navigation.navigate('CoinDetail', { coinId: item.id })}
                    >
                        <Text style={styles.coinName}>
                            {item.name} ({item.symbol})
                        </Text>
                        <Text style={styles.coinDetails}>
                            Quantity: {item.quantity || '0'}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
