import axios from "axios";
import { authUrl } from "../constants";

/**
 * TODO: Implement page reloading logic somewhere
 */
const authentication = {
    register: (email: string, password: string) => {
        return axios.post(authUrl + 'signin', null, { params: { email, password}})
            .then(response => {
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            });
    },

    login: (email: string, password: string, remember: boolean = false) => {
        return axios.post(authUrl + 'login', null, { params: { email, password } })
            .then(response => {
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            });
    },

    logout: (hardReload: boolean = false) => {
        localStorage.removeItem('email');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('remember');
        if (hardReload) {
            window.location.href = '/';
        }
    },
};

export default authentication;