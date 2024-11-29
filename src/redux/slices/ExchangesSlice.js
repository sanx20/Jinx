import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiEndpoints } from '../../constants/ApiEndpoints';

export const fetchExchanges = createAsyncThunk(
    'exchanges/fetchExchanges',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(ApiEndpoints.getExchanges);
            if (!response.ok) {
                throw new Error(`Error fetching exchanges. Status: ${response.status}`);
            }
            const result = await response.json();
            return Object.values(result);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const exchangesSlice = createSlice({
    name: 'exchanges',
    initialState: {
        exchanges: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchanges.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExchanges.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exchanges = action.payload;
            })
            .addCase(fetchExchanges.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default exchangesSlice.reducer;
