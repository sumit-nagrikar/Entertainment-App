import axios from 'axios'; // Import axios for HTTP requests
import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for Redux state management
import { MdLocalMovies } from 'react-icons/md'; // Import movie icon from react-icons
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5'; // Import bookmark icons from react-icons
import { addMovie, removeMovie } from '../redux/savedMoviesSlice'; // Import Redux actions
import toast from 'react-hot-toast';

function Movie({ title, fetchURL }) {
  const [movies, setMovies] = useState([]); // State to hold fetched movies
  const [page, setPage] = useState(1); // State to manage pagination
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Hook for navigating programmatically
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies); // Access saved movies from Redux store

  // Function to fetch movies from API
  const fetchMovies = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Fetch movies from API with pagination
      const response = await axios.get(`${fetchURL}&page=${page}`);
      // Update movies state with new results
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error); // Log any errors
    }
    setLoading(false); // Set loading state to false
  };

  // useEffect to fetch movies on component mount and when page or fetchURL changes
  useEffect(() => {
    fetchMovies();
  }, [page, fetchURL]);

  // Function to handle clicking on a movie
  const handleClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the movie detail page
  };

  // Function to save or remove a movie from the saved list
  const saveMovie = (movie) => {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id); // Check if the movie is already saved
    if (isSaved) {
      dispatch(removeMovie(movie.id)); // Remove movie from saved list if already saved
      toast.error("Bookmark Added")
    } else {
      dispatch(addMovie(movie)); // Add movie to saved list if not saved
      toast.success("Bookmark removed")
    }
  };

  // Function to load more movies (pagination)
  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  // Filter the movies list to only include movies
  const filteredMovies = movies.filter((item) => item.media_type === "movie");

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2> {/* Render the list title */}
      <div className='relative flex flex-wrap flex-grow items-center p-4 '>
        <div id='slider' className="flex flex-wrap gap-4">
          {/* Map over the filteredMovies array to render movie cards */}
          {filteredMovies.map((item) => (
            <div
              key={item.id} // Use movie ID as a unique key
              className='w-full sm:w-[280px] md:w-[310px] lg:w-[335px] gap-4 inline-block cursor-pointer relative p-2'
              onClick={() => handleClick(item.id)} // Handle click on movie
            >
              {/* Conditionally render image based on availability */}
              {item.backdrop_path ? (
                <img
                  className='w-full h-35 md:h-40 lg:h-45 object-cover block object-top rounded-sm md:rounded-md lg:rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} // Movie backdrop image
                  alt={item.title}
                />
              ) : (
                <img
                  className='w-full h-35 md:h-40 lg:h-45 block object-cover object-top rounded-sm md:rounded-md lg:rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} // Movie poster image
                  alt={item.title}
                />
              )}
              <div className='absolute top-0 left-0 w-full h-full  text-white text-xl lg:text-2xl'>
                {/* <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p> */}
                <p onClick={(e) => { e.stopPropagation(); saveMovie(item); }}> {/* Handle save movie click */}
                  {/* Conditionally render bookmark icon based on save state */}
                  {savedMovies.some((savedMovie) => savedMovie.id === item.id) ? (
                    <IoBookmark className='absolute top-4 right-6 bg-gray-500 text-gray-950  rounded-full p-1' />
                  ) : (
                    <IoBookmarkOutline className='absolute top-4 right-6 bg-gray-500 text-gray-950  rounded-full p-1' />
                  )}
                </p>
              </div>
              <div className='flex mt-2 justify-between text-sm'>
              <ul className='text-white break-words'>
                  <li>{item?.title || item?.name}</li> {/* Render movie title or name */}
                </ul>
                <div className='flex text-white place-items-center text-xs'>
                  <MdLocalMovies className='text-sm'/> {/* Render movie icon */}
                  <span>Movie</span>
                </div>
              </div>
                
            </div>
          ))}
        </div>
      </div>
      <div className='text-center my-4'>
        <button 
          className='px-4 py-2 bg-blue-500 text-white rounded' // Styling for the load more button
          onClick={loadMoreMovies} // Handle load more click
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Loading...' : 'Load More'} {/* Conditionally render button text based on loading state */}
        </button>
      </div>
    </>
  );
}

export default Movie; // Export the Movie component
