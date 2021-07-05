import axios from 'axios';

const API_AUTH_URL = 'http://localhost:8000/auth/';

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_AUTH_URL + 'login', null, { params: {
                email,
                password
              }})
            .then(response => {
                if(response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
