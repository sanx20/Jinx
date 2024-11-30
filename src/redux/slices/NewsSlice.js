import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CryptoNewsRepo } from '../../data/repositories/CryptoNewsRepo';

export const fetchCryptoNews = createAsyncThunk(
    'cryptoNews/fetchCryptoNews',
    async ({ searchTerm, filter }, { rejectWithValue }) => {
        try {
            const data = await CryptoNewsRepo.fetchNews(searchTerm, filter);
            return data.results;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch news');
        }
    }
);

const cryptoNewsSlice = createSlice({
    name: 'cryptoNews',
    initialState: {
        news: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCryptoNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCryptoNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.news = action.payload;
            })
            .addCase(fetchCryptoNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export default cryptoNewsSlice.reducer;
