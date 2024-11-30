import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddCoinModal = ({ isVisible, onClose, onAddCoin }) => {
    const [coinData, setCoinData] = useState({
        symbol: '',
        quantity: 0,
        purchasePrice: 0,
    });

    const handleAdd = () => {
        onAddCoin(coinData);
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Add Coin</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Symbol (e.g., BTC)"
                    value={coinData.symbol}
                    onChangeText={(text) => setCoinData({ ...coinData, symbol: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    keyboardType="numeric"
                    value={String(coinData.quantity)}
                    onChangeText={(text) =>
                        setCoinData({ ...coinData, quantity: parseFloat(text) })
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder="Purchase Price"
                    keyboardType="numeric"
                    value={String(coinData.purchasePrice)}
                    onChangeText={(text) =>
                        setCoinData({ ...coinData, purchasePrice: parseFloat(text) })
                    }
                />
                <Button title="Add" onPress={handleAdd} />
                <Button title="Cancel" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default AddCoinModal;
