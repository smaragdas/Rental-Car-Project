import axios from 'axios';

const publicAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
    });

    // 🚫 Remove Authorization if accidentally set from global config or reused
    publicAxios.interceptors.request.use((config) => {
    if (config.headers && config.headers.Authorization) {
        delete config.headers.Authorization;
    }

    // Also delete lowercase variant (some Axios versions normalize headers)
    if (config.headers && config.headers.authorization) {
        delete config.headers.authorization;
    }

    return config;
});

export default publicAxios;