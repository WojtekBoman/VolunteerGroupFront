import React from 'react';
import ReactDOM from 'react-dom'
import AuthService from "../services/auth-service";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

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
    }

    render(){

        const { currentUser,showWolontariuszBoard, showPracownikBoard, showPrzewodniczacyBoard } = this.state;
        console.log(showWolontariuszBoard)
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
            <div class="container-fluid">
                <Link to="/" className="navbar-brand">
                <h3>Psi Patrol</h3>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            {/* {/* {showPrzewodniczacyBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Przewo Board
                  </Link>
                </li>
              )} */}

              {showWolontariuszBoard && (
                <div className="navbar-nav ml-auto">
                  <Link to={"/wol"} className="nav-link">
                  <li className="nav-item">
                    Wolontariusz
                    </li>
                  </Link>
                  </div>
              )} 

              {showPrzewodniczacyBoard && (
                <div className="navbar-nav ml-auto">
                  <Link to={"/prz"} className="nav-link">
                  <li className="nav-item">
                    Ekran przewodniczącego
                    </li>
                  </Link>
                  </div>
              )}  

              {showPracownikBoard && (
                  <Link to={"/pra"} className="nav-link">
                  <li className="nav-item">
                    Ekran pracownika
                    </li>
                  </Link>
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
                  <Link to={"/profile"} className="nav-link">
                  <li className="nav-item">
                    {currentUser.email}
                    </li>
                  </Link>
                <li className="nav-item">
                  <a href="/logowanie" className="nav-link" onClick={this.logout}>
                    Wyloguj
                  </a>
                </li>
              </div>
            ) : (
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
    
                    <Link to="/logowanie">
                    <li class="nav-item">
                        <a class="nav-link " href="#">Logowanie</a>
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
        </nav>
        )
    }
    
}


export default Navbar;