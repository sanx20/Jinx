import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ExchangesRepo } from '../../data/repositories/ExchangesRepo';

export const fetchExchanges = createAsyncThunk(
    'exchanges/fetchExchanges',
    async (_, { rejectWithValue }) => {
        try {
            const data = await ExchangesRepo.fetchExchanges();
            const exchangesArray = Object.values(data);
            return exchangesArray;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch exchanges');
        }
    }
);

const exchangeSlice = createSlice({
    name: 'exchanges',
    initialState: {
        exchanges: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchanges.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchExchanges.fulfilled, (state, action) => {
                state.isLoading = false;
                state.exchanges = action.payload;
            })
            .addCase(fetchExchanges.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export default exchangeSlice.reducer;
