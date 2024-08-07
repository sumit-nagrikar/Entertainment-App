import React from 'react'; // Import React
import MovieCard from './MovieCard'; // Import the MovieCard component

const MovieList = ({ title, movies, searchMovie = false }) => { 
  // Destructure props: title, movies, and searchMovie (default to false)

  return (
    <div className='px-8'>
      {/* Render the list title with conditional styling based on searchMovie prop */}
      <h1 className= "text-gray-200 text-2xl py-3">
       Search results for {title}
      </h1>
      {/* Create a horizontally scrollable container for the movie cards */}
      <div className='flex overflow-x-auto no-scrollbar custom-scrollbar-hide cursor-pointer'>
        <div className='flex items-center'>
          {/* Map over the movies array to render MovieCard components */}
          {movies?.map((movie) => (
            <MovieCard 
              key={movie.id} // Use movie ID as a unique key
              movieId={movie.id} // Pass movie ID as a prop to MovieCard
              posterPath={movie.poster_path} // Pass poster path as a prop
              backdropPath={movie.backdrop_path} // Pass backdrop path as a prop
              mediaType={movie.media_type} // Pass media type as a prop
              title={movie.name || movie.title} // Pass title or name as a prop
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList; // Export the MovieList component
