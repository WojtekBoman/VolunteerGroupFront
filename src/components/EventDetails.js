import React from 'react';
import eventService from '../services/event-service';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class EventDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data:{}
        }
    }

    async componentDidMount() {
        const {data} = await eventService.getWydarzeniaId(this.props.match.params.id)
        this.setState({loading: false,data})
        console.log(data);
    }

    render(){
    return(
        <div id="eventDetails" className="container bg-light border rounded border-dark">
            {this.state.loading ? 
            (<div id="loading" className="text-center">
                  <span className="spinner-border spinner-border-lg"></span>
                  <br/>
                  <h4>Trwa pobieranie danych ...</h4>
                  <br />
                  </div>)
                  : (
                        <div>
                        <h1 class="display-4">{this.state.data.nazwa}</h1>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">{this.state.data.kategoria}</li>
                            <li class="list-group-item">{this.state.data.miejsce}</li>
                            <li class="list-group-item">{this.state.data.adres}</li>
                            <li class="list-group-item">Potrzebujemy {this.state.data.liczbaPotrzebnychWolontariuszy} wolontariuszy</li>
                            <li class="list-group-item">{this.state.data.dataRozpoczecia}</li>
                            {/* <li class="list-group-item">{this.state.data.idTwor}</li> */}
                            </ul>
                        <p>{this.state.data.opis}</p>
                        <a class="btn btn-success btn-lg" style={{margin:"5px"}} href="#" role="button">Weź udział</a>
                        <a class="btn btn-danger btn-lg" style={{margin:"5px"}} href="#" role="button">Anuluj udział</a>
                        <Link to="/wydarzenia"><button class="btn btn-primary btn-lg" style={{margin:"5px"}} role="button">Wróć do wydarzeń</button></Link>
                    </div>
                  )
                  }
            
        </div>
    )
    }
}

export default EventDetails;