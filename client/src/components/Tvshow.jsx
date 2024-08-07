import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PiTelevisionFill } from 'react-icons/pi';
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { addMovie, removeMovie } from '../redux/savedMoviesSlice';
import toast from 'react-hot-toast';

function Tvshow({ title, fetchURL }) {
  const [tvshows, setTVshows] = useState([]); // State to hold fetched TV shows
  const [page, setPage] = useState(1); // State to manage pagination
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Hook for navigating programmatically
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const savedMovies = useSelector((state) => state.savedMovies.savedMovies); // Access saved movies from Redux store

  // Function to fetch TV shows from API
  const fetchShows = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get(`${fetchURL}&page=${page}`); // Fetch TV shows from API with pagination
      setTVshows((prevShows) => [...prevShows, ...response.data.results]); // Update TV shows state with new results
    } catch (error) {
      console.error('Error fetching TV shows:', error); // Log any errors
    }
    setLoading(false); // Set loading state to false
  };

  // useEffect to fetch TV shows on component mount and when page or fetchURL changes
  useEffect(() => {
    fetchShows();
  }, [page, fetchURL]);

  // Handle click to navigate to TV show details page
  const handleClick = (id) => {
    navigate(`/tv/${id}`);
  };

  // Add or remove TV show from saved list
  const saveShow = (show) => {
    const isSaved = savedMovies.some((savedShow) => savedShow.id === show.id);
    if (isSaved) {
      dispatch(removeMovie(show.id)); // Remove from saved movies
      toast.error("Bookmark Added")
    } else {
      dispatch(addMovie(show)); // Add to saved movies
      toast.success("Bookmark removed")
    }
  };

  // Function to load more TV shows (pagination)
  const loadMoreShows = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  // Filter the tvshows list to only include TV shows
  const filteredShows = tvshows.filter((item) => item.media_type === "tv");

  return (
    <>
      {/* Section title */}
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex flex-wrap flex-grow items-center p-4 '>
        <div id='slider' className="flex flex-wrap gap-4"></div>
        {/* Container for TV shows slider */}
        <div id='slider'>
          {filteredShows.map((item) => (
            <div
              key={item.id}
              className='w-full sm:w-[280px] md:w-[340px] lg:w-[330px] gap-4 inline-block cursor-pointer relative p-2'
              onClick={() => handleClick(item.id)} // Navigate to details on click
            >
              {/* Display TV show image or fallback */}
              {item.backdrop_path ? (
                <img
                  className='w-full h-35 md:h-40 lg:h-45 object-cover block object-top rounded-sm md:rounded-md lg:rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt={item.title || item.name}
                />
              ) : (
                <img
                  className='w-full h-35 md:h-40 lg:h-45 object-cover block object-top rounded-sm md:rounded-md lg:rounded-md'
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title || item.name}
                />
              )}
              {/* Overlay with TV show details and save button */}
              <div className='absolute top-0 left-0 w-full h-full  text-white text-xl lg:text-2xl'>
                {/* <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item.title || item.name}
                </p> */}
                <p onClick={(e) => { e.stopPropagation(); saveShow(item); }}>
                  {savedMovies.some((savedShow) => savedShow.id === item.id) ? (
                    <IoBookmark className='absolute top-4 right-6 bg-gray-500 text-gray-950  rounded-full p-1' />
                  ) : (
                    <IoBookmarkOutline className='absolute top-4 right-6 bg-gray-500 text-gray-950  rounded-full p-1' />
                  )}
                </p>
              </div>
              {/* TV show details and type */}
              <div className='flex mt-2 text-sm text-white justify-between'>
              <div className='break-words'>{item.title || item.name}</div>
                <div className='flex items-center text-xs'>
                 
                      <PiTelevisionFill className='text-white text-sm' />
                      <span className='text-white '>TV Series</span>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='text-center my-4'>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded' // Styling for the load more button
          onClick={loadMoreShows} // Handle load more click
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Loading...' : 'Load More'} {/* Conditionally render button text based on loading state */}
        </button>
      </div>
    </>
  );
}

export default Tvshow;
