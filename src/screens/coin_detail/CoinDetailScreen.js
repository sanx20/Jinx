import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, Alert, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinDetails, fetchCoinMarkets } from '../../redux/slices/CoinSlice';
import { fetchCandleData } from '../../redux/slices/CandleSlice';
import { updatePortfolio, fetchPortfolio } from '../../redux/slices/PortfolioSlice';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import CandleChart from '../../components/candle_chart/CandleChart';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

export default function CoinDetailScreen({ route }) {
    const { coinId } = route.params;
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const isFocused = useIsFocused();

    const { coinDetails, markets, status, error } = useSelector((state) => state.coins);
    const { candleData, candleStatus, candleError } = useSelector((state) => state.candles);
    const { balance } = useSelector((state) => state.portfolio);

    useEffect(() => {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
            setUserId(currentUser.uid);
            dispatch(fetchPortfolio(currentUser.uid));
        } else {
            Alert.alert('Error', 'User is not logged in.');
        }
    }, [dispatch]);

    useEffect(() => {
        if (isFocused && userId) {
            dispatch(fetchPortfolio(userId));
        }
    }, [isFocused, dispatch, userId]);

    useEffect(() => {
        if (coinId) {
            dispatch(fetchCoinDetails(coinId));
            dispatch(fetchCoinMarkets(coinId));
        }
        const intervalId = setInterval(() => {
            if (coinId) dispatch(fetchCandleData(coinId));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [dispatch, coinId]);

    const isLoading = status === 'loading' || candleStatus === 'loading';
    const hasError = error || candleError;

    const handleTransaction = () => {
        if (!userId) {
            Alert.alert('Error', 'User ID is missing. Please log in.');
            return;
        }

        const quantityValue = parseFloat(quantity || 0);
        const priceValue = parseFloat(coinDetails?.price_usd || 0);
        const totalCost = parseFloat((priceValue * quantityValue).toFixed(2));

        if (isNaN(quantityValue) || quantityValue <= 0) {
            Alert.alert('Error', 'Invalid quantity.');
            return;
        }

        if (transactionType === 'buy' && totalCost > balance) {
            Alert.alert('Error', 'Insufficient balance to complete the transaction.');
            return;
        }

        dispatch(
            updatePortfolio({
                userId,
                coin: coinDetails,
                action: transactionType,
                quantity: quantityValue,
                totalCost,
            })
        )
            .unwrap()
            .then(() => {
                Alert.alert(
                    'Success',
                    `${transactionType === 'buy' ? 'Bought' : 'Sold'} ${quantityValue} ${coinDetails.symbol}`
                );
                setModalVisible(false);
                setQuantity('');
                dispatch(fetchPortfolio(userId)); // Fetch updated balance and portfolio
            })
            .catch((err) => Alert.alert('Error', `Failed to complete transaction: ${err}`));
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#BB86FC" />
            </View>
        );
    }

    if (hasError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    {error || candleError || 'An error occurred'}
                </Text>
            </View>
        );
    }

    if (!coinDetails) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No coin details available</Text>
            </View>
        );
    }

    const currentPrice = parseFloat(coinDetails?.price_usd || 0);
    const marketCap = parseFloat(coinDetails?.market_cap_usd || 0).toLocaleString();
    const percentChange24h = parseFloat(coinDetails?.percent_change_24h || 0).toFixed(2);

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.coinName}>
                    {coinDetails?.name || 'N/A'} ({coinDetails?.symbol || 'N/A'})
                </Text>
                <Text style={styles.price}>${currentPrice.toLocaleString()}</Text>
                <Text style={styles.marketCap}>Market Cap: ${marketCap}</Text>
                <Text style={styles.change}>24h Change: {percentChange24h}%</Text>
                <Text style={styles.balance}>Your Balance: ${balance.toLocaleString()}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Buy"
                        onPress={() => {
                            setTransactionType('buy');
                            setModalVisible(true);
                        }}
                    />
                    <Button
                        title="Sell"
                        color="red"
                        onPress={() => {
                            setTransactionType('sell');
                            setModalVisible(true);
                        }}
                    />
                </View>
            </View>

            <CandleChart data={candleData || []} />

            <FlatList
                data={markets || []}
                numColumns={2}
                keyExtractor={(item, index) => `${item?.name}-${index}`}
                contentContainerStyle={styles.marketList}
                renderItem={({ item }) => (
                    <View style={styles.marketTile}>
                        <Text style={styles.marketName}>{item?.name || 'N/A'}</Text>
                        <Text style={styles.marketPrice}>
                            ${parseFloat(item?.price_usd || 0).toLocaleString()}
                        </Text>
                        <Text style={styles.marketVolume}>
                            Vol: ${parseFloat(item?.volume_usd || 0).toLocaleString()}
                        </Text>
                    </View>
                )}
            />

            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {transactionType === 'buy' ? 'Buy' : 'Sell'} {coinDetails?.symbol}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter quantity"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                        <View style={styles.modalActions}>
                            <Button
                                title="Confirm"
                                onPress={handleTransaction}
                                disabled={!quantity || isNaN(quantity) || quantity <= 0}
                            />
                            <Button
                                title="Cancel"
                                color="red"
                                onPress={() => {
                                    setModalVisible(false);
                                    setQuantity('');
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
