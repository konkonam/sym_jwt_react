import axios from "axios";
import { history, authUrl, apiUrl, UNAUTHORIZED, NOT_FOUND } from "../constants";
import { message } from "antd";

const api = axios.create({
  baseURL: apiUrl
});

// request interceptor to add the access token header to requests
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

// response interceptor to refresh token on receiving token expired error
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && error.response.status === UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log('Refreshing Access token...');
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
            }).catch(error => {
                console.log('Could not refresh access token!');
                history.push('/login');
                return Promise.reject(error);
            });
        }
        
        // 401 and no refreshToken available
        if (error.response.status === UNAUTHORIZED) {
            message.error('Access denied!')
            history.push('/login');
            return Promise.reject(error);
        }

        // 404
        if (error.response.status === NOT_FOUND) {
            history.push('/error/404');
            return Promise.reject(error);
        }

        // Any other error
        history.push('/error/' + error.response.status);
        return Promise.reject(error);
    }
);

export default api;