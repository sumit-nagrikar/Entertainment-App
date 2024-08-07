import React, { useState } from 'react'; // Import React and useState
import { useDispatch } from 'react-redux'; // Import useDispatch hook for Redux actions
import axios from 'axios'; // Import axios for making API requests
import { LuSearch } from 'react-icons/lu'; // Import search icon from react-icons
import { SEARCH_MOVIE_URL, options } from '../utils/constant'; // Import constants for API URL and options
import { setSearchMovieDetails } from '../redux/searchSlice'; // Import action to set search movie details
import { setLoading } from '../redux/userSlice'; // Import action to set loading state
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const SearchBar = () => {
    const [searchMovie, setSearchMovie] = useState(''); // State to store the search input
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Handler for form submission
    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch(setLoading(true)); // Set loading state to true
        try {
            // Configuration for the API request
            const config = {
                headers: {
                    'Authorization': `Bearer YOUR_API_KEY_OR_TOKEN`, // Replace with actual API key or token
                    ...options.headers, // Merge additional headers if needed
                }
            };
    
            // API request to fetch search results
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, config);
            
            const movies = res?.data?.results; // Extract movie results from the response
            // console.log("res",res,res.data,res.data.results);
    
            // Dispatch action to store search results in Redux
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
            navigate(`/search/${searchMovie}`); // Navigate to search results page
        } catch (error) {
            console.log(error); // Log any errors
        } finally {
            dispatch(setLoading(false)); // Set loading state to false
        }
        setSearchMovie(''); // Clear search input
    };

    return (
        <div className="flex justify-center w-full">
            <form
                onSubmit={submitHandler} // Handle form submission
                className="w-full mt-4 h-14 bg-[#161D2F] z-50 flex gap-3 justify-center items-center font-light text-HeadingXS lg:justify-evenly lg:text-HeadingM px-2 lg:py-5 lg:gap-0 rounded-lg"
            >
                <LuSearch className="text-xl lg:text-3xl" /> {/* Search icon */}
                <input
                    value={searchMovie} // Controlled input value
                    onChange={(e) => setSearchMovie(e.target.value)} // Update search input state
                    type="text"
                    placeholder="Search..."
                    className="w-[95%] text-2xl bg-[#161D2F] text-gray-500 h-fit  focus:outline-none border-b-2 border-transparent lg:w-[94%] placeholder-text-wrap"
                />
            </form>
        </div>
    );
};

export default SearchBar;
