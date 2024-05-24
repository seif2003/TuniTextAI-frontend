import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:1236', // Replace with your API base URL
});

// Add an interceptor to include the Bearer token in the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
});

export default axiosInstance;