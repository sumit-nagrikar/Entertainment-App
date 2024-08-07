import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching trending data
export const fetchTrendingData = createAsyncThunk(
  'data/fetchTrendingData',
  async (fetchURL, thunkAPI) => {
    try {
      const response = await axios.get(fetchURL);
      return response.data.results; // Return the results from the response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle error
    }   
  }
);

// Async thunk for fetching recommended data
export const fetchRecommendedData = createAsyncThunk(
  'data/fetchRecommendedData',
  async (fetchURL, thunkAPI) => {
    try {
      const response = await axios.get(fetchURL);
      return response.data.results; // Return the results from the response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle error
    }   
  }
);

// Create a slice for data fetching
const fetchDataSlice = createSlice({
  name: 'data',
  initialState: {
    trendingData: [],
    recommendedData: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trendingData = action.payload; // Store the trending data in state
      })
      .addCase(fetchTrendingData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error message in state
      })
      .addCase(fetchRecommendedData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendedData = action.payload; // Store the recommended data in state
      })
      .addCase(fetchRecommendedData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error message in state
      });
  },
});

export default fetchDataSlice.reducer;
