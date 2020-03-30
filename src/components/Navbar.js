import React from 'react';
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
        <div class="container-fluid">
            <Link to="/">
            <a class="navbar-brand"><h3>Psi Patrol</h3></a>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
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
    </nav>
    )
}


export default Navbar;