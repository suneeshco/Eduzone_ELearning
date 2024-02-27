import axios from 'axios';

// Create an instance of Axios with a base URL
export const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend server URL
});