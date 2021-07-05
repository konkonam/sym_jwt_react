import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8000/api/';

class ProductService {
  getAllProducts() {
    return axios.get(API_URL + 'products', { headers: authHeader() });
  }
}

export default new ProductService();
