import { User } from "../models/userModel.js"; // Import User model
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing
import jwt from "jsonwebtoken"; // Import jwt for token generation
import { generateSecretKey } from "../generateSecretKey.js"; // Import function to generate JWT secret key

export const Login = async (req, res) => { // Login function
    try { // Try block for handling login logic
        const jwtSecret = generateSecretKey(); // Generate JWT secret key
        const { email, password } = req.body; // Destructure email and password from request body

        if (!email || !password) { // Check for missing email or password
            return res.status(400).json({ // Return error response
                message: "Invalid data",
                success: false
            });
        }

        const user = await User.findOne({ email }); // Find user by email
        if (!user) { // Check if user does not exist
            return res.status(401).json({ // Return error response
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password); // Compare provided password with stored password
        if (!isMatch) { // Check if password does not match
            return res.status(401).json({ // Return error response
                message: "Invalid email or password",
                success: false
            });
        }

        const tokenData = { id: user._id }; // Prepare token data with user ID
        const token = jwt.sign(tokenData, jwtSecret, { expiresIn: "10d" }); // Sign JWT token with secret key

        return res.status(200).cookie("token", token, { // Set token in cookies and send success response
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            maxAge: 3600000 // 1 hour
        }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });

    } catch (error) { // Catch block for handling errors
        console.log(error); // Log error to console
        return res.status(500).json({ // Return internal server error response
            message: "Internal Server Error",
            success: false
        });
    }
};

export const Logout = async (req, res) => { // Logout function
    try { // Try block for handling logout logic
        return res.status(200).cookie("token", "", { // Clear token from cookies and send success response
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            expires: new Date(0) // Set expiration date to epoch to clear cookie
        }).json({
            message: "User logged out successfully.",
            success: true
        });
    } catch (error) { // Catch block for handling errors
        console.log(error); // Log error to console
        return res.status(500).json({ // Return internal server error response
            message: "Internal Server Error",
            success: false
        });
    }
};

export const Register = async (req, res) => { // Register function
    try { // Try block for handling registration logic
        const { fullName, email, password } = req.body; // Destructure fullName, email, and password from request body

        if (!fullName || !email || !password) { // Check for missing data
            return res.status(400).json({ // Return error response
                message: "Invalid data",
                success: false
            });
        }

        const user = await User.findOne({ email }); // Find user by email
        if (user) { // Check if user already exists
            return res.status(409).json({ // Return conflict response
                message: "This email is already used",
                success: false
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 16); // Hash password

        await User.create({ // Create new user with hashed password
            fullName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ // Return success response
            message: "Account created successfully.",
            success: true
        });

    } catch (error) { // Catch block for handling errors
        console.log(error); // Log error to console
        return res.status(500).json({ // Return internal server error response
            message: "Internal Server Error",
            success: false
        });
    }
};
