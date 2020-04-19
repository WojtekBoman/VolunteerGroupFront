import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://psipatrol.herokuapp.com/api/test/';

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