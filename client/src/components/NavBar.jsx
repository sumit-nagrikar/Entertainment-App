import { useState } from 'react'; // Import React's useState hook for managing local state
import { SiWindows } from "react-icons/si"; // Import specific icons from react-icons
import { MdMovieCreation, MdLocalMovies } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { VscAccount } from "react-icons/vsc";
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { setUser } from '../redux/userSlice'; // Import Redux action for setting user
import axios from "axios"; // Import axios for making HTTP requests
import { API_END_POINT } from '../utils/constant'; // Import the API endpoint from constants
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast for notifications

const NavBar = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const user = useSelector((state) => state.app.user); // Access the user from Redux state
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State to manage logout confirmation dialog visibility

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`); // Make a GET request to the logout endpoint
      if (res.data.success) {
        toast.success(res.data.message); // Display a success message on successful logout
        dispatch(setUser(null)); // Clear the user from Redux state
        navigate("/login"); // Navigate to the login page
      }
    } catch (error) {
      console.log(error); // Log any errors
    } finally {
      setShowLogoutConfirmation(false); // Close the logout confirmation dialog
    }
  };

  // Function to show the logout confirmation dialog
  const confirmLogout = () => {
    setShowLogoutConfirmation(true);
  };

  // Function to cancel the logout process
  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <>
      <Toaster /> {/* Render Toaster for displaying toast notifications */}
      <div className="relative h-screen w-16 flex flex-col items-center justify-between bg-gray-900 py-4 rounded-t-lg rounded-b-lg">
        {/* Top Icons */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-red-600">
            <MdMovieCreation className="text-red-600" />
          </div>
          <div className="mt-4"></div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/')}>
            <SiWindows className="text-gray-500 hover:text-red-600" size={25} />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/movieshow')}>
            <MdLocalMovies className="text-gray-500 hover:text-red-600" size={25} />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/tvshow')}>
            <PiTelevisionBold className="text-gray-500 hover:text-red-600" size={25} />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer" onClick={() => navigate('/saved-shows')}>
            <FaBookmark className="text-gray-500 hover:text-red-600" size={25} />
          </div>
        </div>
        {/* Bottom Icons */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 cursor-pointer" onClick={confirmLogout}>
            <VscAccount className="text-gray-500" size={25} />
          </div>
          {user && (
            <p className="text-white text-sm mt-2">{user.fullName}</p> // Display user's full name if logged in
          )}
        </div>
      </div>
      {showLogoutConfirmation && ( // Render logout confirmation dialog if needed
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="mb-4">Are you sure you want to logout?</p>
            <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded mr-2">
              Yes
            </button>
            <button onClick={cancelLogout} className="bg-gray-300 py-2 px-4 rounded">
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
