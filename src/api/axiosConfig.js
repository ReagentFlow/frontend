import axios from "axios";
import API_URL from "constants/constants";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

const refreshToken = async () => {
    try {
        const refresh = JSON.parse(localStorage.getItem('authTokens')).refresh;
        const response = await axiosInstance.post('/auth/token/refresh/', { refresh });
        response.data.refresh = refresh;
        localStorage.setItem('authTokens', response.data);
        return response.data.access;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            if (authTokens && authTokens.access) {
                config.headers.Authorization = `Bearer ${authTokens.access}`;
            }
        } catch (error) {
            console.error('Error parsing authTokens from localStorage:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshToken();
                axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;