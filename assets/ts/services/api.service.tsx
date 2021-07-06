import axios from 'axios';
import authHeader from './authHeader';

class ApiService {
  url = 'http://localhost:8000/api/';

  getProducts = async () => {
    return await axios.get(this.url + 'products', { headers: authHeader() })
  }
}

export default new ApiService();
