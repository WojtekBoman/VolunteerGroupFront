import React, { Component } from "react";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service";
import '../styles/info.css'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(AuthService.getCurrentUser());
    this.state = {
      currentUser: AuthService.getCurrentUser()
      
    };
  }

  render() {
    const { currentUser } = this.state;
    
    return (
      <div className="container bg-light border rounded border-dark" id="info">
      <header>
          <h3>Profil użytkownika</h3>
          <hr className="my-4"></hr>
      </header>
      <div className="row">
          <div className="col-md-4 text-center">
              <FontAwesomeIcon size="7x" icon={faUser}/>
          </div>
          <div className="col-md-8">
          <p style={{fontSize:"20px"}}><strong>Imię:</strong> {currentUser.imie}</p>
          <p style={{fontSize:"20px"}}><strong>Nazwisko:</strong> {currentUser.nazwisko}</p>
          <p style={{fontSize:"20px"}}><strong>Email:</strong> {currentUser.email}</p>
          </div>
      </div>
      <Link className="link-button" to="/wiadomosci"><button className="btn btn-dark btn-block">Wiadomości</button></Link>
      <Link className="link-button" to="/wydarzenia"><button className="btn btn-dark btn-block">Wydarzenia</button></Link>
      {this.state.currentUser.roles.includes("ROLE_WOLONTARIUSZ") && (<Link className="link-button" to="/userEvents"><button className="btn btn-dark btn-block">Twoje wydarzenia</button></Link>)}
      <Link className="link-button" to="/zbiorki"><button className="btn btn-dark btn-block">Zbiórki</button></Link>
      <Link className="link-button" to="/oferty"><button className="btn btn-dark btn-block">Oferty</button></Link>
   
  </div>
    );
  }
}