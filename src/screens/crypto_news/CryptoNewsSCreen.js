import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoNews } from '../../redux/slices/NewsSlice';
import styles from './styles';

const CryptoNewsScreen = () => {
    const dispatch = useDispatch();
    const { news, isLoading, error } = useSelector((state) => state.cryptoNews);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        dispatch(fetchCryptoNews({ searchTerm, filter }));
    }, [dispatch, searchTerm, filter]);

    const renderNewsItem = ({ item }) => (
        <View style={styles.newsItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.source}>Source: {item.source.title}</Text>
            {item.panic_score && (
                <Text style={styles.panicScore}>Panic Score: {item.panic_score}</Text>
            )}
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
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => dispatch(fetchCryptoNews({ searchTerm, filter }))}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by currency (e.g., BTC, ETH)"
                placeholderTextColor="#BB86FC"
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={filter === 'rising' ? styles.filterButtonActive : styles.filterButton}
                    onPress={() => setFilter('rising')}
                >
                    <Text style={styles.filterText}>Rising</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={filter === 'bullish' ? styles.filterButtonActive : styles.filterButton}
                    onPress={() => setFilter('bullish')}
                >
                    <Text style={styles.filterText}>Bullish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={filter === 'bearish' ? styles.filterButtonActive : styles.filterButton}
                    onPress={() => setFilter('bearish')}
                >
                    <Text style={styles.filterText}>Bearish</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={news}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderNewsItem}
                contentContainerStyle={styles.newsList}
            />
        </View>
    );
};

export default CryptoNewsScreen;
