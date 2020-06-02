// IMPORT REACT 
import React from 'react';
import ReactDOM from 'react-dom'
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

// IMPORT COMPONENTS
import Navbar from './Navbar'
import MessagesMenu from './MessagesMenu'
import Home from './Home'
import EventCreator from './Events/EventCreator'
import EventsMenu from './Events/EventsMenu'
import Footer from './Footer'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Profile from './profile-info'
import EventDetails from "./Events/EventDetails"
import UserEvents from "./Events/UserEvents"
import history from '../history'
import OfferCreator from "./OfferCreator"
import OfferMenu from "./OfferMenu"
import MessageWriter from './MessageWriter'
import MessageDetail from './MessageDetail'
import CollectionMenu from './CollectionMenu';
import CollectionCreator from './CollectionCreator';
import EventChart from './EventChart';
import ActivityChart from './ActivityChart';
import NewsCreator from './NewsCreator'

// IMPORT CSS
import '../styles/app.css'
import '../styles/chart.css'




class App extends React.Component {

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL} history={history}>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/rejestracja" component={RegisterForm}/>
                    <Route path="/logowanie" component={LoginForm}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/wiadomosci" component={MessagesMenu}/>
                    <Route path="/wiadomosciSzczegoly/:id" component={MessageDetail}/>
                    <Route path="/zbiorki" component={CollectionMenu} />
                    <Route path="/nowaZbiorka" component={CollectionCreator} />
                    <Route path="/nowaWiadomosc" component={MessageWriter}/>
                    <Route path="/wydarzenia" component={EventsMenu}/>
                    <Route path="/noweWydarzenie" component={EventCreator}/>
                    <Route path="/userEvents" component={UserEvents} />
                    <Route path="/eventDetails/:id" component={EventDetails} />
                    <Route path="/nowaOferta" component={OfferCreator}/>
                    <Route path="/oferty" component={OfferMenu}/>
                    <Route path="/wykresWydarzen" component={EventChart} />
                    <Route path="/wykresAktywnosci" component={ActivityChart} />
                    <Route path="/tworzenieNewsa" component={NewsCreator}/>
                </Switch>
                <Footer />
            </div>
            </Router>
        )
    }
}


export default App;