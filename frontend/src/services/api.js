import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use((config) => {
    try {
        console.log('[Axios Interceptor] Running for:', config.url);
        const userStr = localStorage.getItem('user');
        if (userStr && userStr !== 'undefined' && userStr !== 'null') {
            const user = JSON.parse(userStr);
            if (user && user.token) {
                // Ensure config.headers exists
                config.headers = config.headers || {};
                
                // Fallback for different Axios versions
                if (typeof config.headers.set === 'function') {
                    config.headers.set('Authorization', `Bearer ${user.token}`);
                } else {
                    config.headers['Authorization'] = `Bearer ${user.token}`;
                }
                console.log('[Axios Interceptor] Attached token successfully');
            } else {
                console.warn('[Axios Interceptor] No token found in user object');
            }
        } else {
            console.warn('[Axios Interceptor] No user found in localStorage');
        }
    } catch (e) {
        console.error('[Axios Interceptor] Error attaching token in interceptor:', e);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchUrls = async () => {
    const response = await api.get('/url/all');
    return response.data.data;
};

export const shortenUrl = async (originalUrl) => {
    const response = await api.post('/url/create', { originalUrl });
    return response.data.data;
};

export const deleteUrl = async (id) => {
    const response = await api.delete(`/url/${id}`);
    return response.data;
};

export default api;
