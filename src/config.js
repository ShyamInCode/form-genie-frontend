// API URLs based on environment
const config = {
  development: {
    apiUrl: 'http://localhost:3000'
  },
  production: {
    apiUrl: '/api' // This will be relative to wherever the frontend is deployed
  }
};

const environment = process.env.NODE_ENV || 'development';
export const API_URL = config[environment].apiUrl; 