import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';

export default function AddCoxinModal({ isVisible, onClose, onConfirm, coin, action }) {
    const [quantity, setQuantity] = useState('');

    const handleConfirm = () => {
        const parsedQuantity = parseFloat(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            alert('Please enter a valid quantity.');
            return;
        }
        onConfirm(parsedQuantity);
        setQuantity('');
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {action === 'buy' ? 'Buy' : 'Sell'} {coin?.name || ''}
                    </Text>
                    <TextInput
                        placeholder="Enter quantity"
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Button title="Confirm" onPress={handleConfirm} />
                    <Button title="Cancel" onPress={onClose} color="red" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        width: '100%',
        borderRadius: 8,
    },
});
