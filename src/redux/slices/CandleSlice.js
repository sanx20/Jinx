import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CoinRepo } from '../../data/repositories/CoinRepo';

export const fetchCandleData = createAsyncThunk(
    'candles/fetchCandleData',
    async (coinId, thunkAPI) => {
        try {
            const candleData = await CoinRepo.generateCandleData(coinId);
            if (!candleData) {
                return thunkAPI.rejectWithValue('Failed to fetch candle data');
            }
            return candleData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const candleSlice = createSlice({
    name: 'candles',
    initialState: {
        candleData: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCandleData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCandleData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.candleData = action.payload;
            })
            .addCase(fetchCandleData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default candleSlice.reducer;
