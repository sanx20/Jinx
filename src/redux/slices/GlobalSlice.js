import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalRepo } from '../../data/repositories/GlobalRepo';

export const fetchGlobalStats = createAsyncThunk(
    'global/fetchGlobalStats',
    async (_, thunkAPI) => {
        try {
            const globalStats = await GlobalRepo.fetchGlobalStats();
            if (!globalStats || !Array.isArray(globalStats) || globalStats.length === 0) {
                return thunkAPI.rejectWithValue('Failed to fetch global statistics');
            }
            return globalStats[0];
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        globalStats: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalStats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGlobalStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.globalStats = action.payload;
            })
            .addCase(fetchGlobalStats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default globalSlice.reducer;
