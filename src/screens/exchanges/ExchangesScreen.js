import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchanges } from '../../redux/slices/ExchangesSlice';
import { BarChart } from 'react-native-chart-kit';
import styles from './styles';

const screenWidth = Dimensions.get('window').width;

const ExchangeListScreen = () => {
    const dispatch = useDispatch();
    const { exchanges, isLoading, error } = useSelector((state) => state.exchanges);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedExchanges, setSortedExchanges] = useState([]);

    useEffect(() => {
        dispatch(fetchExchanges());
    }, [dispatch]);

    useEffect(() => {
        if (exchanges) setSortedExchanges(exchanges);
    }, [exchanges]);

    const handleSearch = (text) => {
        setSearchTerm(text);
        const filtered = exchanges.filter(
            (exchange) =>
                exchange.name.toLowerCase().includes(text.toLowerCase()) ||
                (exchange.country && exchange.country.toLowerCase().includes(text.toLowerCase()))
        );
        setSortedExchanges(filtered);
    };

    const handleSort = (key) => {
        const sorted = [...sortedExchanges].sort((a, b) => (b[key] || 0) - (a[key] || 0));
        setSortedExchanges(sorted);
    };

    const renderExchangeItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.exchangeName}>{item.name}</Text>
            <Text style={styles.exchangeInfo}>Volume (USD): {item.volume_usd ? item.volume_usd.toFixed(2) : 'N/A'}</Text>
            <Text style={styles.exchangeInfo}>Active Pairs: {item.active_pairs || 'N/A'}</Text>
            <Text style={styles.exchangeInfo}>Country: {item.country || 'N/A'}</Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#BB86FC" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <TouchableOpacity onPress={() => dispatch(fetchExchanges())}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const totalActivePairs = exchanges.reduce((sum, exchange) => sum + (exchange.active_pairs || 0), 0);
    const highestVolumeExchange = exchanges.reduce(
        (prev, current) => (prev.volume_usd > current.volume_usd ? prev : current),
        { name: 'N/A', volume_usd: 0 }
    );
    const averageVolume = (exchanges.reduce((sum, exchange) => sum + (exchange.volume_usd || 0), 0) / exchanges.length).toFixed(2);

    const topExchangesByVolume = sortedExchanges.slice(0, 5);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Total Active Pairs: {totalActivePairs}</Text>
                <Text style={styles.headerText}>Highest Volume: {highestVolumeExchange.name} (${highestVolumeExchange.volume_usd.toFixed(2)})</Text>
                <Text style={styles.headerText}>Average Volume: ${averageVolume}</Text>
            </View>

            <TextInput
                style={styles.searchBar}
                placeholder="Search exchanges by name or country"
                placeholderTextColor="#BB86FC"
                value={searchTerm}
                onChangeText={handleSearch}
            />

            <View style={styles.sortButtonsContainer}>
                <TouchableOpacity style={styles.sortButton} onPress={() => handleSort('volume_usd')}>
                    <Text style={styles.sortButtonText}>Sort by Volume</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton} onPress={() => handleSort('active_pairs')}>
                    <Text style={styles.sortButtonText}>Sort by Active Pairs</Text>
                </TouchableOpacity>
            </View>

            <BarChart
                data={{
                    labels: topExchangesByVolume.map((e) => e.name),
                    datasets: [
                        {
                            data: topExchangesByVolume.map((e) => e.volume_usd || 0),
                        },
                    ],
                }}
                width={screenWidth - 30}
                height={250}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={15}
                style={styles.chart}
            />

            <FlatList
                data={sortedExchanges}
                keyExtractor={(item) => item.id}
                renderItem={renderExchangeItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const chartConfig = {
    backgroundColor: '#1E2923',
    backgroundGradientFrom: '#121212',
    backgroundGradientTo: '#121212',
    color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.7,
};

export default ExchangeListScreen;
