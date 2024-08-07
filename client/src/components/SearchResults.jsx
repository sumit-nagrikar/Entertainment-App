import React from 'react'; // Import React
import { useSelector } from 'react-redux'; // Import useSelector for accessing Redux state
import MovieList from './MovieList'; // Import MovieList component to display movies

const SearchResults = () => {
    // Retrieve movie name and search results from the Redux store
    const { movieName, searchedMovie } = useSelector((store) => store.searchMovie);
    // Retrieve loading state from the Redux store
    const isLoading = useSelector((store) => store.app.isLoading);

    return (
        <div>
            {isLoading ? (
                // Display a loading message while data is being fetched
                <div className="flex justify-center mt-4 text-lg">Loading...</div>
            ) : searchedMovie && searchedMovie.length > 0 ? (
                // If movies are found, display them using the MovieList component
                <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
            ) : (
                // If no movies are found, display a "Movie Not Found" message
                <div className="flex justify-center mt-4 text-gray-300 text-2xl">Movie Not Found!!</div>
            )}
        </div>
    );
};

export default SearchResults;
