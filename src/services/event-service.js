import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class eventService {
    getWydarzenia(){
        return axios.get(API_URL+'wydarzenia',{headers: authHeader()})
    }

    getWydarzeniaId(id) {
        return axios.get(API_URL+"wydarzenia/"+id,{headers: authHeader()})
    }

    postWydarzenia(nazwa,miejsce,adres,opis,liczbaPotrzebnychWolontariuszy,kategoria,dataRozpoczecia){
        return axios.post(API_URL+'wydarzenia',{nazwa,miejsce,adres,opis,liczbaPotrzebnychWolontariuszy,kategoria,dataRozpoczecia},{headers: authHeader()})
    }
}

export default new eventService;