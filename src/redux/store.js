import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slices/CoinSlice';
import globalReducer from './slices/GlobalSlice';
import exchangesReducer from './slices/ExchangesSlice';

export const store = configureStore({
    reducer: {
        coins: coinReducer,
        global: globalReducer,
        exchanges: exchangesReducer,
    },
});
