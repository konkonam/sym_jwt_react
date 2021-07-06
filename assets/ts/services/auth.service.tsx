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
                    window.location.href = '/products'
                }   

                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
        document.cookie = 'PHPSESSID =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.reload();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
