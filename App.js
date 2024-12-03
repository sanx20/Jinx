import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import ExchangesScreen from './src/screens/exchanges/ExchangesScreen';
import CryptoNewsScreen from './src/screens/crypto_news/CryptoNewScreen';
import CoinDetailScreen from './src/screens/coin_detail/CoinDetailScreen';
import PortfolioScreen from './src/screens/portfolio/PortfolioScreen';
import AuthScreen from './src/screens/auth/AuthScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'stats-chart';
          } else if (route.name === 'Exchanges') {
            iconName = 'business';
          } else if (route.name === 'CryptoNews') {
            iconName = 'newspaper';
          } else if (route.name === 'Portfolio') {
            iconName = 'wallet';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#483D8B',
        tabBarStyle: {
          backgroundColor: '#1A1A2E',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: '#1A1A2E',
        },
        headerTintColor: '#8A2BE2',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Exchanges" component={ExchangesScreen} options={{ title: 'Exchanges' }} />
      <Tab.Screen name="CryptoNews" component={CryptoNewsScreen} options={{ title: 'Crypto News' }} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{ title: 'Portfolio' }} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen
              name="CoinDetail"
              component={CoinDetailScreen}
              options={{
                headerStyle: { backgroundColor: '#1A1A2E' },
                headerTitle: 'Coin Detail',
                headerTintColor: '#8A2BE2',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
  },
});
