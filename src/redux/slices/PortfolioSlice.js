import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

// Fetch portfolio from Firebase
export const fetchPortfolio = createAsyncThunk(
    'portfolio/fetchPortfolio',
    async (userId, thunkAPI) => {
        try {
            const userDocRef = doc(FIREBASE_DB, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                return userDoc.data().portfolio || {}; // Return portfolio or empty object
            } else {
                return {}; // Return empty portfolio if user document doesn't exist
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update portfolio in Firebase
export const updatePortfolio = createAsyncThunk(
    'portfolio/updatePortfolio',
    async ({ userId, coin }, thunkAPI) => {
        try {
            const userDocRef = doc(FIREBASE_DB, 'users', userId);
            await setDoc(
                userDocRef,
                { portfolio: { [coin.symbol]: coin } },
                { merge: true }
            );
            return { coin };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        portfolio: {},
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
                state.portfolio = action.payload;
            })
            .addCase(fetchPortfolio.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(updatePortfolio.fulfilled, (state, action) => {
                const { coin } = action.payload;
                state.portfolio[coin.symbol] = coin;
            });
    },
});

export default portfolioSlice.reducer;
