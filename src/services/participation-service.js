import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class participationService {

    wezUdzial(idWydarzenia) {
        return axios.post(API_URL + `udzial/wez/${idWydarzenia}`,{headers: authHeader()});
    }

    anulujUdzial(idWydarzenia) {
        return axios.post(API_URL + `udzial/anuluj/${idWydarzenia}`,{headers: authHeader()});
    }

    getWydarzenia() {
        return axios.get(API_URL + `udzial/wydarzenia-uzytkownika`,{headers: authHeader()});
    }

}

export default new participationService();