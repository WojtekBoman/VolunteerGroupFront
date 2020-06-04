import React from 'react';
import ReactDOM from 'react-dom'
import AuthService from "../services/auth-service";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
  import history from '../history';

class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            currentUser: undefined,
            showPrzewodniczacyBoard: false,
            showPracownikBoard: false
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if(user) {

          console.log(user);
            this.setState({
                currentUser: AuthService.getCurrentUser(),
                showWolontariuszBoard: user.roles.includes("ROLE_WOLONTARIUSZ"),
                showPrzewodniczacyBoard: user.roles.includes("ROLE_PRZEWODNICZACY"),
                showPracownikBoard: user.roles.includes("ROLE_PRACOWNIK")
            })
        }
    }

    logout(){
       
        AuthService.logout();
        history.push('/logowanie')
    }

    render(){

        const { currentUser,showWolontariuszBoard, showPracownikBoard, showPrzewodniczacyBoard } = this.state;
        console.log(showWolontariuszBoard)
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
            
                <Link to="/" className="navbar-brand">
                <h3>Psi Patrol</h3>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
           
                <div class="collapse navbar-collapse" id="navbarNavDropdown">

            {/* {/* {showPrzewodniczacyBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Przewo Board
                  </Link>
                </li>
              )} */}

              {showWolontariuszBoard && (
                <div className="navbar-nav">
                  {/* <Link to={"/wiadomosci"} className="nav-link">
                  <li className="nav-item">
                    Wiadomości
                    </li>
                  </Link> */}
                  <Link to={"/zbiorki"} className="nav-link">
                  <li className="nav-item">
                    Zbiórki
                    </li>
                  </Link>
                  <Link to={"/wydarzenia"} className="nav-link">
                  <li className="nav-item">
                    Wydarzenia
                    </li>
                  </Link>
                  <Link to={"/oferty"} className="nav-link">
                  <li className="nav-item">
                    Oferty
                    </li>
                  </Link>
                  </div>
              )} 

              {showPrzewodniczacyBoard && (
                <div className="navbar-nav">
                  {/* <Link to={"/prz"} className="nav-link">
                  <li className="nav-item">
                    Ekran przewodniczącego
                    </li>
                  </Link> */}
                  <Link to={"/tworzenieNewsa"} className="nav-link">
                  <li id="addNewsMenu" className="nav-item">
                    Dodaj news
                    </li>
                  </Link>
                  <li class="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Statystyki</a>
                  <div class="dropdown-menu">
                        <Link to={"/wykresAktywnosci"} className="dropdown-item">Aktywność</Link>
                        <Link to={"/wykresWydarzen"} className="dropdown-item">Zbiórki</Link>
                    </div>
                  </li>
                  <li class="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Wydarzenia</a>
                  <div class="dropdown-menu">
                        <Link to={"/wydarzenia"} className="dropdown-item">Przeglądaj</Link>
                        <Link to={"/noweWydarzenie"} className="dropdown-item">Dodaj</Link>
                    </div>
                  </li>
                  </div>
              )}  

              {showPracownikBoard && (
                  <div className="navbar-nav">
                  <li class="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Oferty</a>
                  <div class="dropdown-menu">
                        <Link id="showOffersLink" to={"/oferty"} className="dropdown-item">Przeglądaj</Link>
                        <Link id="addOfferLink" to={"/nowaOferta"} className="dropdown-item">Dodaj</Link>
                    </div>
                  </li>

                  <li class="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Zbiórki</a>
                  <div class="dropdown-menu">
                        <Link to={"/zbiorki"} className="dropdown-item">Przeglądaj</Link>
                        <Link to={"/nowaZbiorka"} className="dropdown-item">Dodaj</Link>
                    </div>
                  </li>

                  </div>
              )}  


{/* 
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )} */}
           

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li class="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Wiadomości</a>
                  <div class="dropdown-menu">
                        <Link to={"/wiadomosci"} className="dropdown-item">Skrzynka odbiorcza</Link>
                        <Link to={"/nowaWiadomosc"} className="dropdown-item">Wyślij wiadomość</Link>
                    </div>
                  </li>
                  
                <Link to={"/userEvents"} className="nav-link">
                  <li className="nav-item">
                    Twoje wydarzenia
                    </li>
                  </Link>
                  <Link to={"/profile"} className="nav-link">
                  <li className="nav-item">
                    {currentUser.email}
                    </li>
                  </Link>
                    <li class="nav-item" onClick={this.logout}>
                        <a id="logoutRef" class="nav-link" href="">Wyloguj</a>
                    </li>
                    
                    
              </div>
            ) : (
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
    
                    <Link to="/logowanie">
                    <li class="nav-item">
                        <a id="loginPageRef" class="nav-link" href="#">Logowanie</a>
                    </li>
                    </Link>
                    <Link to="/rejestracja"> 
                    <li class="nav-item">
                        <a class="nav-link" href="#">Rejestracja</a>
                    </li>
                    </Link>
                </ul>
            </div>

            )}

            <div className="navbar-nav">
            <Link to="/encyklopedia">
            <li class="nav-item">
                        <a id="encyklopediaRef"class="nav-link" href="#">Encyklopedia</a>
                    </li>
            </Link>
            </div>

            </div>
        </nav>
        )
    }
    
}


export default Navbar;