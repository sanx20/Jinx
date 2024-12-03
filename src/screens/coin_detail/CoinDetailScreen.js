import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
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
    const { candleData, candleStatus } = useSelector((state) => state.candles);
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

    const handleTransaction = () => {
        const quantityValue = parseFloat(quantity || 0);
        const priceValue = parseFloat(coinDetails?.price_usd || 0);
        const totalCost = parseFloat((priceValue * quantityValue).toFixed(2));

        if (transactionType === 'buy' && totalCost > balance) {
            Alert.alert('Error', 'Insufficient balance.');
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
                Alert.alert('Success', `${transactionType === 'buy' ? 'Bought' : 'Sold'} ${quantityValue} ${coinDetails.symbol}`);
                setModalVisible(false);
                setQuantity('');
                dispatch(fetchPortfolio(userId));
            })
            .catch((err) => Alert.alert('Error', `Transaction failed: ${err}`));
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#BB86FC" />
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

    return (
        <>
            <FlatList
                data={markets}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                contentContainerStyle={styles.scrollContainer}
                ListHeaderComponent={
                    <>
                        <View style={styles.topSection}>
                            <Text style={styles.coinName}>
                                {coinDetails.name} ({coinDetails.symbol})
                            </Text>
                            <Text style={styles.price}>${parseFloat(coinDetails.price_usd).toLocaleString()}</Text>
                            <Text style={styles.marketCap}>Market Cap: ${parseFloat(coinDetails.market_cap_usd).toLocaleString()}</Text>
                            <Text
                                style={[
                                    styles.change,
                                    parseFloat(coinDetails.percent_change_24h) >= 0
                                        ? styles.positiveChange
                                        : styles.negativeChange,
                                ]}
                            >
                                24h Change: {parseFloat(coinDetails.percent_change_24h).toFixed(2)}%
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.buyButton]}
                                    onPress={() => {
                                        setTransactionType('buy');
                                        setModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Buy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.sellButton]}
                                    onPress={() => {
                                        setTransactionType('sell');
                                        setModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Sell</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CandleChart data={candleData || []} />
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.marketTile}>
                        <Text style={styles.marketName}>{item.name}</Text>
                        <Text style={styles.marketPrice}>
                            ${parseFloat(item.price_usd).toLocaleString()}
                        </Text>
                        <Text style={styles.marketVolume}>
                            Vol: ${parseFloat(item.volume_usd || 0).toLocaleString()}
                        </Text>
                    </View>
                )}
                style={{ backgroundColor: '#121212' }}
                bounces={false}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
            />
            <Modal visible={modalVisible} transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {transactionType === 'buy' ? 'Buy' : 'Sell'} {coinDetails.symbol}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter quantity"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleTransaction}
                            >
                                <Text style={styles.modalButtonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
