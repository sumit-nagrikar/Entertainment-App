// Define the API endpoint for user-related operations
// export const API_END_POINT = 'http://localhost:8000/api/v1/user';
export const API_END_POINT = 'https://the-entertainment-app.onrender.com/api/v1/user';

// Configuration options for API requests
export const options = {
  method: 'GET', // HTTP method for the request
  headers: {
    accept: 'application/json', // Specifies that the response should be in JSON format
    Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}` // Bearer token for authentication
  }
};

// Base URL for searching movies using TMDB API
export const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/multi?query=';

// Base URL for TMDB images with a specific image size
export const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';
