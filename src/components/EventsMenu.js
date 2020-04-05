import React from 'react'
import ReactDOM from 'react-dom';
import Event from './Event'
import '../styles/menu.css'

class EventsMenu extends React.Component {

    render() {
        return (
            <div id="eventMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Aktualne wydarzenia</h1>
                    <hr className="my-4" />
                </header>
                <div className="scrollMenu">
                <Event/>
                <Event/>
            </div>
            </div>
        )
    }
}

export default EventsMenu;