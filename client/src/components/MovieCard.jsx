import React from 'react'; // Import React library
import { TMDB_IMG_URL } from '../utils/constant'; // Import base image URL for TMDB
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { getId, setOpen } from '../redux/movieSlice'; // Import actions from movieSlice
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'; // Import bookmark icons
import { MdLocalMovies } from 'react-icons/md'; // Import movie icon
import { PiTelevisionFill } from 'react-icons/pi'; // Import TV icon
import { addMovie, removeMovie } from '../redux/savedMoviesSlice'; // Import actions for saving movies
import toast from 'react-hot-toast';

// MovieCard component definition
const MovieCard = ({ posterPath, movieId, title, backdropPath, mediaType }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies); // Get saved movies from Redux state

  // Skip rendering if both posterPath and backdropPath are null
  if (!posterPath && !backdropPath) {
    return null; // Return null if no images are available
  };

  // Function to handle opening the movie detail modal
  const handleOpen = () => {
    dispatch(getId(movieId)); // Dispatch action to set the current movie ID
    dispatch(setOpen(true)); // Dispatch action to open the movie detail modal
  };

  // Function to save or remove a movie from the saved list
  const saveShow = (movie) => {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id); // Check if the movie is already saved
    if (isSaved) {
      dispatch(removeMovie(movie.id)); // Dispatch action to remove the movie if it's already saved
      toast.error("Bookmark removed")
    } else {
      dispatch(addMovie(movie)); // Dispatch action to add the movie if it's not saved
      toast.success("Bookmark added")
    }
  };

  return (
    <div
      className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[300px] inline-block cursor-pointer relative p-2'
      onClick={handleOpen} // Handle opening the movie detail modal on click
    >
      {/* Render the backdrop or poster image */}
      {backdropPath ? (
        <img
          className='w-full h-40 object-cover block object-top rounded-md'
          src={`${TMDB_IMG_URL}/${backdropPath}`} // Use backdropPath if available
          alt={title} // Set alt attribute for accessibility
        />
      ) : (
        <img
          className='w-full h-40 block object-cover object-top rounded-md'
          src={`${TMDB_IMG_URL}/${posterPath}`} // Use posterPath if backdropPath is not available
          alt={title} // Set alt attribute for accessibility
        />
      )}

      {/* Overlay with movie title and bookmark icon */}
      <div className='absolute top-0 left-0 w-full h-full text-white'>
        {/* <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          {title} {/* Display movie title }
        </p> */}
        <p onClick={(e) => { e.stopPropagation(); saveShow({ id: movieId, title, backdropPath, posterPath, mediaType }); }}>
          {/* Conditional rendering of bookmark icon */}
          {savedMovies.some((savedMovie) => savedMovie.id === movieId) ? (
            <IoBookmark className='absolute top-4 right-6 text-gray-300  bg-gray-100 rounded-2xl text-lg p-1' /> // Filled bookmark icon if movie is saved
          ) : (
            <IoBookmarkOutline className='absolute top-4 right-6 text-gray-900 bg-gray-100 rounded-2xl text-lg p-1' /> // Outline bookmark icon if movie is not saved
          )}
        </p>
      </div>

      {/* Media type and title display */}
      <div className='flex items-center mt-2 justify-between text-sm'>
        <ul className='text-white flex gap-4 mr-4'>
          <li>{title}</li> {/* Display movie title */}
        </ul>
        {/* Display media type icon and label */}
        {mediaType === 'movie' ? (
          <div className='flex items-center'>
            <MdLocalMovies className='text-white' /> {/* Movie icon */}
            <span className='text-white'>Movie</span> {/* Label */}
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <PiTelevisionFill className='text-white' /> {/* TV icon */}
            <span className='text-white'>TV</span> {/* Label */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard; // Export the MovieCard component
