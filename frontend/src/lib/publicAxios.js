import axios from 'axios';

const publicAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // optional, only if backend uses cookies/session
});

export default publicAxios;