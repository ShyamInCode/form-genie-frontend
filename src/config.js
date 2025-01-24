// API URLs based on environment
const config = {
  development: {
    apiUrl: 'http://localhost:3000'
  },
  production: {
    // Use environment variable or fallback to a default URL
    apiUrl: process.env.REACT_APP_API_URL || 'https://formbuilder-backend.onrender.com'
  }
};

const environment = process.env.NODE_ENV || 'development';
export const API_URL = config[environment].apiUrl; 