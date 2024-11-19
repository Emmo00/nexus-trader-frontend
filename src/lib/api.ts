import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Adjust this to match your API base URL
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    if (token) token = token.slice(1, -1);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;