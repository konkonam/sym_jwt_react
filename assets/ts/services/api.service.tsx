import axios from "axios";
import { authUrl, apiUrl } from "../constants";

const api = axios.create({
  baseURL: apiUrl
});

//request interceptor to add the auth token header to requests
api.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['x-access-token'] = accessToken;
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

//response interceptor to refresh token on receiving token expired error
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios
                .post(authUrl + 'refresh', { refresh: refreshToken })
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('email', res.data.email);
                        localStorage.setItem('accessToken', res.data.accessToken);
                        localStorage.setItem('refreshToken', res.data.refreshToken);
                        console.log('Access token refreshed!');
                        return axios(originalRequest.data);
                    }
            });
        }

        return Promise.reject(error);
    }
);

export default api;