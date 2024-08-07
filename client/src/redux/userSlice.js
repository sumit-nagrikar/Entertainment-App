import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from Redux Toolkit

// Define the userSlice
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState: {
    user: null, // Initial state for the user, starts as null
    isLoading: false // Initial state for loading status, starts as false
  },
  reducers: {
    // Reducer to set the user state
    setUser: (state, action) => {
      state.user = action.payload; // Update the user state with the payload from the action
    },
    // Reducer to set the loading status
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Update the loading state with the payload from the action
    }
  }
});

// Export the actions for use in components
export const { setUser, setLoading } = userSlice.actions;

// Export the reducer to be used in the store configuration
export default userSlice.reducer;
