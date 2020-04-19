// IMPORT REACT 
import React from 'react';
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

// IMPORT COMPONENTS
import Navbar from './Navbar'
import MessagesMenu from './MessagesMenu'
import Home from './Home'
import EventCreator from './EventCreator'
import EventsMenu from './EventsMenu'
import Footer from './Footer'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Profile from './profile-info'
import EventDetails from "./EventDetails"

// IMPORT CSS
import '../styles/app.css'

class App extends React.Component {

    render() {
        return (
            <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/VolunteerGroup_Front" exact component={Home}/>
                    <Route path="/rejestracja" component={RegisterForm}/>
                    <Route path="/logowanie" component={LoginForm}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/wiadomosci" component={MessagesMenu}/>
                    <Route path="/wydarzenia" component={EventsMenu}/>
                    <Route path="/noweWydarzenie" component={EventCreator}/>
                    <Route path="/eventDetails/:id" component={EventDetails} />
                </Switch>
                <Footer />
            </div>
            </Router>
        )
    }
}


export default App;