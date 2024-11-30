import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slices/CoinSlice';
import globalReducer from './slices/GlobalSlice';
import exchangesReducer from './slices/ExchangesSlice';
import cryptoNewsReducer from './slices/NewsSlice';
import candleReducer from './slices/CandleSlice';
import portfolioReducer from './slices/PortfolioSlice';


export const store = configureStore({
    reducer: {
        coins: coinReducer,
        global: globalReducer,
        exchanges: exchangesReducer,
        cryptoNews: cryptoNewsReducer,
        candles: candleReducer,
        portfolio : portfolioReducer,
    },
});
