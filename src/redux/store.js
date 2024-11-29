import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slices/CoinSlice';
import globalReducer from './slices/GlobalSlice';

export const store = configureStore({
    reducer: {
        coins: coinReducer,
        global: globalReducer,
    },
});
