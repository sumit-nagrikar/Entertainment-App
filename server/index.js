import express from "express"; // Import Express framework for building the web server
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file
import databaseConnection from "./utils/database.js"; // Import function to connect to the database
import cookieParser from "cookie-parser"; // Import cookie-parser to handle cookies
import userRoute from "./routes/userRoute.js"; // Import routes for user-related API endpoints
import cors from "cors"; // Import cors to handle Cross-Origin Resource Sharing (CORS)

// Load environment variables from .env file
dotenv.config({
    path: "./.env" // Specify the path to the .env file for environment variables
});

// Connect to the database
databaseConnection(); // Call function to establish a connection to the database

const app = express(); // Create an Express application instance

// Middlewares
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (e.g., from forms)
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies from the request

const corsOptions = { // Configuration options for CORS
    origin: true, // Allow requests from any origin
    credentials: true // Allow credentials (cookies, authorization headers) in cross-origin requests
};
app.use(cors(corsOptions)); // Apply CORS middleware with the specified options

// API routes
app.use("/api/v1/user", userRoute); // Mount user-related routes at /api/v1/user

// Use port from environment variable or default to 3000
const port = process.env.PORT || 3000; // Set the port for the server, defaulting to 3000 if not specified

app.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server listening at port ${port}`); // Log server start message
});
