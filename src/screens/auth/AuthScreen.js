import React, { useState } from 'react';
import {
    View,
    TextInput,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
    Image,
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
                    <Image
                        source={require('../../../assets/jinx_logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.header}>
                        {isSignUp ? 'Join the Chaos' : 'Welcome Back'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#8A2BE2"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#8A2BE2"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {!loading ? (
                        <>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={isSignUp ? handleSignUp : handleSignIn}
                            >
                                <Text style={styles.buttonText}>
                                    {isSignUp ? 'Sign Up Now' : 'Sign In'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsSignUp((prev) => !prev)}
                                style={styles.toggleButton}
                            >
                                <Text style={styles.toggleText}>
                                    {isSignUp
                                        ? 'Already a User? Sign In'
                                        : "New Here? Join the Chaos"}
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <ActivityIndicator size="large" color="#8A2BE2" />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}