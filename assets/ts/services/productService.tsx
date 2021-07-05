import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class ProductService {
  getAllProducts() {
    return axios.get(API_URL + 'products', { headers: authHeader() });
  }
}

export default new ProductService();