import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoNews } from '../../redux/slices/NewsSlice';

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
            <Text style={styles.header}>Crypto News</Text>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#BB86FC',
        marginBottom: 10,
        fontSize: 16,
    },
    retryText: {
        color: '#FFFFFF',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#BB86FC',
        textAlign: 'center',
        marginVertical: 20,
    },
    searchBar: {
        backgroundColor: '#1F1B24',
        color: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    filterButton: {
        backgroundColor: '#1F1B24',
        padding: 10,
        borderRadius: 8,
    },
    filterButtonActive: {
        backgroundColor: '#BB86FC',
        padding: 10,
        borderRadius: 8,
    },
    filterText: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
    },
    newsList: {
        paddingBottom: 20,
    },
    newsItem: {
        backgroundColor: '#1F1B24',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    source: {
        color: '#B0B0B0',
        fontSize: 14,
        marginBottom: 5,
    },
    panicScore: {
        color: '#FF3E4D',
        fontSize: 14,
    },
});

export default CryptoNewsScreen;
