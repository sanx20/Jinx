import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const fetchPortfolio = createAsyncThunk(
    'portfolio/fetchPortfolio',
    async (userId, thunkAPI) => {
        try {
            const userDocRef = doc(FIREBASE_DB, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                return {
                    portfolio: userDoc.data()?.portfolio || {},
                    balance: parseFloat(userDoc.data()?.balance || 0),
                };
            } else {
                return { portfolio: {}, balance: 0 };
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updatePortfolio = createAsyncThunk(
    'portfolio/updatePortfolio',
    async ({ userId, coin, action, quantity, totalCost }, thunkAPI) => {
        try {
            const userDocRef = doc(FIREBASE_DB, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) throw new Error('User does not exist.');

            const userData = userDoc.data();
            const currentPortfolio = userData?.portfolio || {};
            const currentBalance = parseFloat(userData?.balance || 0);

            let updatedBalance = currentBalance;
            let updatedPortfolio = { ...currentPortfolio };

            quantity = parseFloat(quantity || 0);
            totalCost = parseFloat(totalCost || 0);

            if (action === 'buy') {
                if (updatedBalance < totalCost) throw new Error('Insufficient balance.');
                updatedBalance -= totalCost;

                updatedPortfolio[coin.symbol] = {
                    ...(currentPortfolio[coin.symbol] || {}),
                    name: coin.name,
                    symbol: coin.symbol,
                    quantity:
                        parseFloat(currentPortfolio[coin.symbol]?.quantity || 0) + quantity,
                    purchasePrice: coin.price_usd,
                };
            } else if (action === 'sell') {
                if (
                    !currentPortfolio[coin.symbol] ||
                    parseFloat(currentPortfolio[coin.symbol]?.quantity || 0) < quantity
                ) {
                    throw new Error('Insufficient quantity to sell.');
                }

                updatedBalance += totalCost;

                const newQuantity =
                    parseFloat(currentPortfolio[coin.symbol].quantity || 0) - quantity;
                if (newQuantity > 0) {
                    updatedPortfolio[coin.symbol].quantity = newQuantity;
                } else {
                    delete updatedPortfolio[coin.symbol];
                }
            }

            await updateDoc(userDocRef, {
                balance: updatedBalance,
                portfolio: updatedPortfolio,
            });

            return { updatedPortfolio, updatedBalance };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        portfolio: {},
        balance: 0,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortfolio.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPortfolio.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.portfolio = action.payload.portfolio;
                state.balance = action.payload.balance;
            })
            .addCase(fetchPortfolio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(updatePortfolio.fulfilled, (state, action) => {
                state.portfolio = action.payload.updatedPortfolio;
                state.balance = action.payload.updatedBalance;
            });
    },
});

export default portfolioSlice.reducer;
