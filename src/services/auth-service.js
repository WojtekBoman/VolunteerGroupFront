import axios from 'axios';

const API_URL = "https://psipatrol.herokuapp.com/api/auth/";

class AuthService {
    login(email, haslo) {
        return axios
            .post(API_URL + "signin",{
                email,
                haslo
            })
            .then(res =>{
                if (res.data.token) {
                    localStorage.setItem("user",JSON.stringify(res.data));
                }

                return res.data;
    
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email,haslo,imie,nazwisko) {
        return axios.post(API_URL + "signup", {
            email,
            haslo,
            imie,
            nazwisko
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();

