import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ApiTask = axios.create({
    baseURL: BASE_URL
});

ApiTask.interceptors.request.use(request => {
    return request;
});

ApiTask.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default ApiTask;