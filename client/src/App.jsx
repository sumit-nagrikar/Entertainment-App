import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Directly import components
import Login from "./components/Login"; // Login page
import Home from "./pages/Home"; // Home page
import MovieDetail from "./components/MovieDetail"; // Movie detail page
import Movieshow from "./components/Movieshow"; // Page showing movies
import requests from "./Requests"; // API request configurations
import NavBar from "./components/NavBar"; // Navigation bar component
import Tvshow from "./components/Tvshow"; // Page showing TV shows
import SearchBar from "./components/SearchBar"; // Search bar component
import SearchResults from "./components/SearchResults"; // Search results page
import SavedShow from "./components/SavedShow"; // Saved shows page

function App() {
    const location = useLocation(); // Get current route location
    const navigate = useNavigate(); // For navigation
    const isSignupPage = location.pathname === "/login"; // Check if current path is login

    // State to check if the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [initialPageVisited, setInitialPageVisited] = useState(false);

    // Check authentication status whenever the route changes
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token'));
    }, [location]);

    // Redirect to login page on initial load if not visited before
    useEffect(() => {
        if (!initialPageVisited) {
            setInitialPageVisited(true);
            navigate("/login");
        }
    }, [initialPageVisited, navigate]);

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsAuthenticated(false); // Update authentication state
    };

    return (
        <>
            <Toaster /> {/* Display notifications */}
            <div className="flex h-screen">
                {/* Show NavBar only if not on login page and user is authenticated */}
                {!isSignupPage && isAuthenticated && <NavBar onLogout={handleLogout} />}
                <div className="flex-1 overflow-auto p-4 bg-gray-950">
                    {/* Show SearchBar only if not on login page and user is authenticated */}
                    {!isSignupPage && isAuthenticated && <SearchBar />}
                    <Routes>
                        {/* Redirect to home or login based on authentication status */}
                        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                        {/* Directly load Login component */}
                        <Route 
                            path="/login" 
                            element={<Login onLogin={() => setIsAuthenticated(true)} />} 
                        />
                        {/* Directly load Home component */}
                        <Route 
                            path="/home" 
                            element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
                        />
                        {/* Route for saved shows */}
                        <Route path="/saved-shows" element={isAuthenticated ? <SavedShow /> : <Navigate to="/login" />} />
                        {/* Route for movie detail page */}
                        <Route path="/:mediaType/:id" element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />} />
                        {/* Route for movies page */}
                        <Route path="/movieshow" element={isAuthenticated ? <Movieshow title="Movies" fetchURL={[requests.requestPopular]} /> : <Navigate to="/login" />} />
                        {/* Route for TV shows page */}
                        <Route path="/tvshow" element={isAuthenticated ? <Tvshow title="TV Series" fetchURL={requests.requestTopRatedtv} /> : <Navigate to="/login" />} />
                        {/* Route for search results */}
                        <Route path="/search/:query" element={isAuthenticated ? <SearchResults /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
