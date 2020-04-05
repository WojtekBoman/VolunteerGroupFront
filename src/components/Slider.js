import React from 'react';
import ReactDOM from 'react-dom';
import background1 from '../img/background1.jpg'
import background2 from '../img/background2.jpg'
import background3 from '../img/background3.jpg'
import AuthService from '../services/auth-service'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Slider extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isLogged: AuthService.getCurrentUser()
    }
  }

  render(){

    const {isLogged} = this.state;

    return(
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src={background1} alt="First slide"/>
                    <div class="carousel-caption">
                      {!isLogged && (<div>
                        <h1 class="display-2">Dołącz do nas</h1>
                        <h3>I ty możesz pomagać</h3>
                        <Link to="/logowanie">
                        <button type="button" style={{margin:"5px"}} 
                        class="btn btn-outline-light btn-lg">Zaloguj się</button>
                        </Link>
                        <Link to="/rejestracja">
                        <button type="button" style={{margin:"5px"}} 
                        class="btn btn-warning btn-lg">Załóż konto</button>
                        </Link>
                        </div>)
                    }
                     {isLogged && (<div><h1 class="display-2">Dziękujemy że jesteś !</h1></div>)}
                    </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src={background2} alt="Second slide"/>
                <div class="carousel-caption">
                    <h1 class="display-2">Aktualności</h1>
                    <a href="#news"><button type="button" class="btn btn-outline-light btn-lg">Przeglądaj</button></a>
                </div>
            </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={background3} alt="Third slide"/>
            <div class="carousel-caption">
                <h1 class="display-2">Masz pytania ?</h1>
                <a href="#footer"><button type="button" class="btn btn-outline-light btn-lg">Kontakt</button></a>
            </div>
          </div>
          
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div> 
    )
  }
}

export default Slider;