import axios from "axios";
import API_URL from "../constants/constants";

const api = axios.create({
    baseURL: API_URL,
});

const refreshTokens = async (refreshToken) => {
    const response = await axios.post(`${API_URL}auth/token/refresh/`, {
        refresh: refreshToken,
    });
    response.data.refresh = refreshToken;
    return response.data;
};

const logoutWithErr = (refreshExist) => {
    if (refreshExist) {
        console.error("Failed to refresh token");
    } else {
        console.error("No refresh token available");
    }
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/login';
};

api.interceptors.request.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.confing;
        if (error.response.status === 401 && error.response.data.code === 'token_not_valid') {
            const refreshToken = JSON.parse(localStorage.getItem('authTokens')).refresh;
            if (refreshToken) {
                try {
                    const newTokens = await refreshTokens(refreshToken);
                    localStorage.setItem('authTokens', JSON.stringify(newTokens));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newTokens.access}`;
                    return axios(originalRequest);
                } catch (err) {
                    logoutWithErr(true);
                }
            } else {
                logoutWithErr(false);
            }
        }
        return Promise.reject(error);
    }
);

export default api;