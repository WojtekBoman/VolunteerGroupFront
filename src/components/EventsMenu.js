import React from 'react'
import ReactDOM from 'react-dom';
import EventList from './EventList'
import eventService from '../services/event-service'
import '../styles/menu.css'

class EventsMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            events: null
        }
    }

    async componentDidMount() {

        console.log("LOADING",this.state.loading);
        const events = await eventService.getWydarzenia();
        this.setState({events});
        this.setState({loading: false});
        console.log("LOADING",this.state.loading);
    }

    render() {
        return (
            <div id="eventMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Aktualne wydarzenia</h1>
                    <hr className="my-4" />
                </header>
                {this.state.loading ? (
                  <div id="loading" className="text-center">
                  <span className="spinner-border spinner-border-lg"></span>
                  <br/>
                  <h4>Trwa pobieranie danych ...</h4>
                  <br />
                  </div>) : (<EventList events={this.state.events}/>)
                }
            </div>
        )
    }
}

export default EventsMenu;