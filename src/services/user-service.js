import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getWolontariuszBoard() {
    return axios.get(API_URL + 'wol', { headers: authHeader() });
  }

  getPracownikBoard() {
    return axios.get(API_URL + 'pra', { headers: authHeader() });
  }

  getPrzewodniczacyBoard() {
    return axios.get(API_URL + 'prz', { headers: authHeader() });
  }
}

export default new UserService();