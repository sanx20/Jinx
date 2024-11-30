import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinDetails, fetchCoinMarkets } from '../../redux/slices/CoinSlice';
import { fetchCandleData } from '../../redux/slices/CandleSlice';
import { updatePortfolio } from '../../redux/slices/PortfolioSlice';
import { FIREBASE_AUTH } from '../../../FirebaseConfig'; // Import Firebase Auth
import CandleChart from '../../components/candle_chart/CandleChart';
import styles from './styles';

export default function CoinDetailScreen({ route }) {
    const { coinId } = route.params; // Only coinId is passed
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(null); // State to hold user ID

    const { coinDetails, markets, status, error } = useSelector((state) => state.coins);
    const { candleData, candleStatus, candleError } = useSelector((state) => state.candles);

    useEffect(() => {
        // Fetch the logged-in user's ID from Firebase Auth
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
            setUserId(currentUser.uid);
        } else {
            Alert.alert('Error', 'User is not logged in.');
        }
    }, []);

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

    const handleAddToPortfolio = () => {
        if (!userId) {
            Alert.alert('Error', 'User ID is missing. Please log in.');
            return;
        }

        if (!coinDetails) {
            Alert.alert('Error', 'Coin details are unavailable.');
            return;
        }

        const coin = {
            id: coinId,
            symbol: coinDetails.symbol,
            name: coinDetails.name,
            price_usd: parseFloat(coinDetails.price_usd || 0),
            market_cap_usd: parseFloat(coinDetails.market_cap_usd || 0),
        };

        dispatch(updatePortfolio({ userId, coin }))
            .unwrap()
            .then(() => Alert.alert('Success', `${coin.name} added to your portfolio!`))
            .catch((err) => Alert.alert('Error', `Failed to add coin: ${err}`));
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
                <Button title="Add to Portfolio" onPress={handleAddToPortfolio} />
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
        </View>
    );
}
