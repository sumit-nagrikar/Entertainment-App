import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store for managing movie-related state
const movieSlice = createSlice({
    name: "movie", // Name of the slice
    initialState: {
        InitialState: null, // Default initial state (not used in reducers)
        nowPlayingMovies: null, // State to store movies currently playing
        popularMovie: null, // State to store popular movies
        topRatedMovies: null, // State to store top-rated movies
        upcomingMovies: null, // State to store upcoming movies
        toggle: false, // State to manage toggle status (e.g., for UI elements)
        trailerMovie: null, // State to store trailer information for a movie
        open: false, // State to manage visibility of certain UI elements (e.g., modal)
        id: "", // State to store movie ID for various operations
    },
    reducers: {
        // Reducer functions to handle actions and update state
        
        // Update nowPlayingMovies state with the payload
        getNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        
        // Update popularMovie state with the payload
        getPopularMovie: (state, action) => {
            state.popularMovie = action.payload;
        },
        
        // Update topRatedMovies state with the payload
        getTopRatedMovie: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        
        // Update upcomingMovies state with the payload
        getUpcomingMovie: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        
        // Toggle the boolean value of the toggle state
        setToggle: (state) => {
            state.toggle = !state.toggle;
        },
        
        // Update trailerMovie state with the payload
        getTrailerMovie: (state, action) => {
            state.trailerMovie = action.payload;
        },
        
        // Update open state with the payload (used for managing UI visibility)
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        
        // Update id state with the payload (used for identifying specific movies)
        getId: (state, action) => {
            state.id = action.payload;
        },
    }
});

// Export the action creators for use in components
export const { getNowPlayingMovies, getPopularMovie, getTopRatedMovie, getUpcomingMovie, setToggle, getTrailerMovie, setOpen, getId } = movieSlice.actions;

// Export the reducer to be used in the Redux store
export default movieSlice.reducer;
