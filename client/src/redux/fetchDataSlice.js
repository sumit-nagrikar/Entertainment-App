// src/redux/fetchDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import requests from '../Requests'; // Import your API requests object

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  'data/fetchData',
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
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // Store the fetched data in state
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error message in state
      });
  },
});

export default fetchDataSlice.reducer;
