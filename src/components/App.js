import React from 'react';
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import MessagesMenu from './MessagesMenu'
import Home from './Home'
import EventsMenu from './EventsMenu'
import Footer from './Footer'
import '../styles/app.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Profile from './profile-info'
import UserService from "../services/user-service"; 

class App extends React.Component {

    render() {
        return (
            <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/rejestracja" component={RegisterForm}/>
                    <Route path="/logowanie" component={LoginForm}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/wiadomosci" component={MessagesMenu}/>
                    <Route path="/wydarzenia" component={EventsMenu}/>
                </Switch>
                <Footer />
            </div>
            </Router>
        )
    }
}


export default App;