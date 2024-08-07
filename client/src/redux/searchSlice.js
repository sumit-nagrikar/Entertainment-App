import { createSlice } from '@reduxjs/toolkit';

// Create a slice of the Redux store for managing search-related state
const searchSlice = createSlice({
  name: 'search', // Name of the slice
  initialState: {
    movieName: null, // Initial state for the search movie name
    searchedMovie: null, // Initial state for the list of searched movies
  },
  reducers: {
    // Reducer to set search movie details
    setSearchMovieDetails: (state, action) => {
      const { searchMovie, movies } = action.payload; // Extract search movie name and list of movies from action payload
      state.movieName = searchMovie; // Set the search movie name in the state
      state.searchedMovie = movies; // Set the list of searched movies in the state
    }
  },
});

// Export the action creator for updating search movie details
export const { setSearchMovieDetails } = searchSlice.actions;

// Export the reducer to be used in the Redux store
export default searchSlice.reducer;
