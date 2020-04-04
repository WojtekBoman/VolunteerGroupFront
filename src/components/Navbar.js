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
            this.setState({
                currentUser: AuthService.getCurrentUser(),
                showPrzewodniczacyBoard: user.roles.includes("prz"),
                showPracownikBoard: user.roles.includes("pra")
            })
        }
    }

    logout(){
        AuthService.logout();
    }

    render(){

        const { currentUser, showPracownikBoard, showPrzewodniczacyBoard } = this.state;

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

            {/* {showPrzewodniczacyBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Przewo Board
                  </Link>
                </li>
              )}

              {showPracownikBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Prac Board
                  </Link>
                </li>
              )} */}
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
                    <Link to="/register"> 
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