import { createSlice } from '@reduxjs/toolkit';

// Create a slice of the Redux store for managing saved movies
const savedMoviesSlice = createSlice({
  name: 'savedMovies', // Name of the slice
  initialState: {
    savedMovies: [], // Initial state with an empty array for saved movies
  },
  reducers: {
    // Reducer to add a movie to the savedMovies array
    addMovie: (state, action) => {
      state.savedMovies.push(action.payload); // Push the movie object from the action payload to the array
    },
    
    // Reducer to remove a movie from the savedMovies array by ID
    removeMovie: (state, action) => {
      state.savedMovies = state.savedMovies.filter(movie => movie.id !== action.payload); // Filter out the movie with the matching ID
    },
    
    // Reducer to set the savedMovies array to a new array from the action payload
    setSavedMovies: (state, action) => {
      state.savedMovies = action.payload; // Replace the current array with the new array from the payload
    }
  },
});

// Export the action creators for use in components
export const { addMovie, removeMovie, setSavedMovies } = savedMoviesSlice.actions;

// Export the reducer to be used in the Redux store
export default savedMoviesSlice.reducer;
