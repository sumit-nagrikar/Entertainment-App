// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import searchReducer from './searchSlice';
import savedMoviesReducer from './savedMoviesSlice';
import fetchDataReducer from './fetchDataSlice'; // Import the fetchData reducer

const store = configureStore({
  reducer: {
    app: userReducer,
    movie: movieReducer,
    searchMovie: searchReducer,
    savedMovies: savedMoviesReducer,
    data: fetchDataReducer, // Add the fetchData reducer here
  },
});

export default store;
