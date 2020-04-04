import React, { Component } from "react";
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
        <div id="info" className="container">
      <div className="jumbotron">
        <h3>
            <strong>{currentUser.email}</strong> Profile
        </h3>
        <hr className="my-4"/>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
      </div>
    );
  }
}