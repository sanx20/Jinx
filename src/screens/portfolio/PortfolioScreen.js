import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio, updatePortfolio } from '../../redux/slices/PortfolioSlice';
import AddCoinModal from '../../components/add_coin_modal/AddCoinModal';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

export default function PortfolioScreen() {
    const dispatch = useDispatch();
    const userId = FIREBASE_AUTH.currentUser?.uid;
    const { portfolio, balance, status, error } = useSelector((state) => state.portfolio);

    const [selectedCoin, setSelectedCoin] = useState(null);
    const [action, setAction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (userId) dispatch(fetchPortfolio(userId));
    }, [dispatch, userId]);

    const handleTransaction = (quantity) => {
        const totalCost = quantity * selectedCoin.price_usd;

        dispatch(
            updatePortfolio({
                userId,
                coin: selectedCoin,
                action,
                quantity,
                totalCost,
            })
        );

        setIsModalVisible(false);
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
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.balance}>Balance: ${balance.toLocaleString()}</Text>
            <FlatList
                data={Object.values(portfolio)}
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => (
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinName}>
                            {item.name} ({item.symbol})
                        </Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <View style={styles.actions}>
                            <Button
                                title="Buy"
                                onPress={() => {
                                    setSelectedCoin(item);
                                    setAction('buy');
                                    setIsModalVisible(true);
                                }}
                            />
                            <Button
                                title="Sell"
                                onPress={() => {
                                    setSelectedCoin(item);
                                    setAction('sell');
                                    setIsModalVisible(true);
                                }}
                                color="red"
                            />
                        </View>
                    </View>
                )}
            />
            {selectedCoin && (
                <AddCoinModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onConfirm={handleTransaction}
                    coin={selectedCoin}
                    action={action}
                />
            )}
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
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
