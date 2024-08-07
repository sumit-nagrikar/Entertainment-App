import crypto from "crypto"; // Import the crypto module for generating cryptographic keys

const generateSecretKey = () => { // Function to generate a secret key
    return crypto.randomBytes(32).toString('hex'); // Generate 32 random bytes and convert them to a hexadecimal string
}

export { generateSecretKey }; // Export the generateSecretKey function for use in other modules
