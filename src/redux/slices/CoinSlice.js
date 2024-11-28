import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CoinRepo } from '../../data/repositories/CoinRepo';

export const fetchMarketData = createAsyncThunk(
    'coins/fetchMarketData',
    async ({ start, limit }, thunkAPI) => {
        try {
            const marketData = await CoinRepo.fetchMarketData(start, limit);
            if (!marketData) {
                return thunkAPI.rejectWithValue('Failed to fetch market data');
            }
            return marketData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const coinSlice = createSlice({
    name: 'coins',
    initialState: {
        marketData: [],
        status: 'idle',
        isFetchingMore: false,
        error: null,
        hasNextPage: true,
        start: 0,
        limit: 10,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarketData.pending, (state) => {
                if (state.start === 0) {
                    state.status = 'loading';
                } else {
                    state.isFetchingMore = true;
                }
            })
            .addCase(fetchMarketData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isFetchingMore = false;

                if (action.payload && action.payload.data) {
                    state.marketData = [...state.marketData, ...action.payload.data];
                    state.hasNextPage = action.payload.pagination.has_next_page;
                    state.start += state.limit;
                }
            })
            .addCase(fetchMarketData.rejected, (state, action) => {
                state.status = 'failed';
                state.isFetchingMore = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default coinSlice.reducer;
