import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import styles from './style';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            Alert.alert('Success', 'You are now signed in!');
        } catch (error) {
            Alert.alert('Sign-in Failed', error.message);
        }
        setLoading(false);
    };

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                FIREBASE_AUTH,
                email,
                password
            );

            const user = userCredential.user;

            await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
                email: user.email,
                createdAt: new Date().toISOString(),
                balance: 10000,
            });

            Alert.alert('Success', 'Account created successfully!');
        } catch (error) {
            Alert.alert('Sign-up Failed', error.message);
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.header}>
                        {isSignUp ? 'Create an Account' : 'Sign In'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#B0B0B0"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#B0B0B0"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {!loading ? (
                        <>
                            <Button
                                title={isSignUp ? 'Sign Up' : 'Sign In'}
                                onPress={isSignUp ? handleSignUp : handleSignIn}
                                color="#BB86FC"
                            />
                            <TouchableOpacity
                                onPress={() => setIsSignUp((prev) => !prev)}
                                style={styles.toggleButton}
                            >
                                <Text style={styles.toggleText}>
                                    {isSignUp
                                        ? 'Already have an account? Sign In'
                                        : "Don't have an account? Sign Up"}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <ActivityIndicator size="large" color="#BB86FC" />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
