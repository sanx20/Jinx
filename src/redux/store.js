import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slices/CoinSlice';

export const store = configureStore({
    reducer: {
        coins: coinReducer,
    },
});
