import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight, MdLocalMovies } from 'react-icons/md';
import { PiTelevisionFill } from 'react-icons/pi';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, removeMovie } from '../redux/savedMoviesSlice';
import toast from 'react-hot-toast';

const Trending = ({ title, trendingData, rowID }) => {
  // State to store the fetched movies
  const [movies, setMovies] = useState([]);
  // Hooks for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access saved movies from the Redux store
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies);

  useEffect(() => {
    // Function to fetch movies data from the API
    const fetchData = async () => {
      try {
        // Map and prepare the results from the API response
        const results = trendingData.map((item) => ({
          ...item,
          media_type: item.media_type || 'movie', // Default media type to 'movie' if not present
        }));
        setMovies(results); // Set the fetched movies into state
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      }
    };

    fetchData(); // Call fetchData when component mounts or fetchURL changes
  }, [trendingData]);

  // Navigate to the details page of the clicked movie/show
  const handleClick = (id, mediaType) => {
    navigate(`/${mediaType}/${id}`); // Route to the details page based on mediaType
  };

  // Add or remove a movie/show from the saved list
  const saveShow = (movie) => {
    const isSaved = savedMovies.some((savedMovie) => savedMovie.id === movie.id);
    if (isSaved) {
      dispatch(removeMovie(movie.id)); // Remove from saved movies if already saved
      toast.error("Bookmark removed");
    } else {
      dispatch(addMovie(movie)); // Add to saved movies if not already saved
      toast.success("Bookmark added");
    }
  };

  // Scroll the slider to the left
  const slideLeft = () => {
    const slider = document.getElementById('slider' + rowID);
    slider.scrollLeft -= 500; // Adjust scroll position by 500 pixels
  };

  // Scroll the slider to the right
  const slideRight = () => {
    const slider = document.getElementById('slider' + rowID);
    slider.scrollLeft += 500; // Adjust scroll position by 500 pixels
  };

  return (
    <div className='my-4'>
      {/* Section title */}
      <h2 className='text-white font-bold md:text-xl px-4'>{title}</h2>
      <div className='relative flex items-center group'>
        {/* Left arrow button for scrolling the slider */}
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        {/* Slider container */}
        <div
          id={'slider' + rowID}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth custom-scrollbar-hide relative'
        >
          {/* Movie items */}
          {movies.map((item) => (
            <div
              key={item.id}
              className='w-full sm:w-[280px] md:w-[340px] lg:w-[400px] inline-block cursor-pointer relative p-2'
              onClick={() => handleClick(item.id, item.media_type)}
            >
              {/* Display movie image or placeholder if not available */}
              {item.backdrop_path || item.poster_path ? (
                <img
                  className='w-full h-50 md:h-55 lg:h-60 object-cover block object-top rounded-sm md:rounded-md lg:rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path || item.poster_path}`}
                  alt={item.title || item.name}
                />
              ) : (
                <div className='w-full h-40 flex items-center justify-center bg-gray-800'>
                  <span>No Image</span>
                </div>
              )}
              {/* Overlay with movie details and bookmark option */}
              <div className='absolute top-0 left-0 w-full h-full text-white text-md md:text-xl lg:text-2xl'>
                <p className='white-space-normal font-bold flex justify-center items-center h-full text-center'>
                  {/* {item.title || item.name} */}
                </p>
                <div onClick={(e) => { e.stopPropagation(); saveShow(item); }}>
                  {savedMovies.some((savedMovie) => savedMovie.id === item.id) ? (
                  <div className="absolute top-4 right-6 bg-gray-500 rounded-full p-1">
                    <IoBookmark className="text-gray-950 " />
                  </div>
                  ) : (
                    <div className="absolute top-4 right-6 bg-gray-200 rounded-full p-1">
                      <IoBookmarkOutline className="text-gray-950" />
                    </div>
                  )}
                </div>
              </div>
              {/* Movie details */}
              <div className='flex flex-col mt-2 text-lg text-white'>
                <div className='flex gap-2 text-sm text-gray-400 '>
                  <div>{item.media_type === 'movie' ? item.release_date : item.first_air_date}</div>      
                  {item.media_type === 'movie' ? (
                    <div  className='flex items-center'>
                      <MdLocalMovies/>
                      <span >Movie</span>
                      </div>
                  ) : (
                    <div className='flex items-center'>
                      <PiTelevisionFill/>
                      <span >TV Series</span>
                      </div>
                  )}
                </div>
                  <div className='truncate font-bold'>{item.title || item.name}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Right arrow button for scrolling the slider */}
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </div>
  );
};

export default Trending;
