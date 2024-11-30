import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio, updatePortfolio } from '../../redux/slices/PortfolioSlice';
import AddCoinModal from '../../components/add_coin_modal/AddCoinModal';
import CoinCard from '../../components/coin_card/CoinCard';

const PortfolioScreen = () => {
    const dispatch = useDispatch();
    const userId = 'userID123';
    const { portfolio, status, error } = useSelector((state) => state.portfolio);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchPortfolio(userId));
    }, [dispatch]);

    const handleAddCoin = (coin) => {
        dispatch(updatePortfolio({ userId, coin }));
        setIsModalVisible(false);
    };

    if (status === 'loading') {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
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
            <Button title="Add Coin" onPress={() => setIsModalVisible(true)} />
            <FlatList
                data={Object.values(portfolio)}
                keyExtractor={(item) => item.symbol}
                renderItem={({ item }) => <CoinCard coin={item} />}
            />
            <AddCoinModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAddCoin={handleAddCoin}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default PortfolioScreen;
