import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './style';


export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Sign-in error:', error);
            alert('Sign-in failed: ' + error.message);
        }
        setLoading(false);
    };

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Sign-up error:', error);
            alert('Registration failed: ' + error.message);
        }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.innerContainer}>
                    <Text style={styles.header}>{isSignUp ? "Create an Account" : "Sign In"}</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        placeholderTextColor="#B0B0B0"
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#B0B0B0"
                    />
                    {!loading ? (
                        <>
                            <Button
                                title={isSignUp ? "Sign Up" : "Sign In"}
                                onPress={isSignUp ? handleSignUp : handleSignIn}
                                color="#BB86FC"
                            />
                            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                                <Text style={styles.toggleText}>
                                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
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
