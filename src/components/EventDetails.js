import React from 'react';
import eventService from '../services/event-service';
import participationService from '../services/participation-service';
import authService from '../services/auth-service';
import authHeader from '../services/auth-header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class EventDetails extends React.Component {

    constructor(props) {
        super(props);
        this.handleParticipation = this.handleParticipation.bind(this);
        this.handleCancelParticipation = this.handleCancelParticipation.bind(this);
        this.getWydarzeniaUzytkownika = this.getWydarzeniaUzytkownika.bind(this);

        this.state = {
            loading: true,
            loadingUdzial:true,
            data:{},
            submitLoading: false,
            cancelLoading: false,
            loadingButtons: true,
            message: '',
            uzytkownicy:null,
            udzial:false,
            isFull: false
        }
    }

    async getUzytkownicy() {
        let url = `https://psipatrol.herokuapp.com/api/udzial/uzytkownicy-wydarzenia/${this.props.match.params.id}`;
        let options = {
            method: 'GET',
            headers : authHeader()
            };

    }

    async getWydarzeniaUzytkownika() {
        const {data} = await participationService.getWydarzenia();

        if(data) {
            const event = data.find(event => event.idZdarzenia == this.props.match.params.id);
            if(event) {
                this.setState({udzial: true});
            }
        }

        
        this.setState({loadingButtons:false})

        console.log("Udział", this.state.udzial)
    }

    async componentDidMount() {
        const {data} = await eventService.getWydarzeniaId(this.props.match.params.id)
        this.setState({loading: false,data})
        console.log(data);
        const isFull = data.liczbaPotrzebnychWolontariuszy == data.liczbaPrzypisanychWolontariuszy;
        this.setState({isFull});

        this.getWydarzeniaUzytkownika();
    }

    handleParticipation(e) {
        e.preventDefault();
        this.setState({submitLoading:true})
        let url = `https://psipatrol.herokuapp.com/api/udzial/wez/${this.props.match.params.id}`;
        let options = {
            method: 'POST',
            headers : authHeader()
            };
        fetch(url,options).then((response) => {
            if(response.status == 200) {
                this.setState({submitLoading:false, message:"Przypisano cie do wydarzenia"});
                window.location.reload();
            }else if(response.status == 409) {
                this.setState({submitLoading:false, message:"Bierzesz udzial w tym wydarzeniu"});
                window.location.reload();
            }else{
                this.setState({submitLoading:false, message:"Wystapil blad. Sprobuj ponownie"});
                window.location.reload();
            }
        }
        );
        
    }

    handleCancelParticipation(e) {
        e.preventDefault();
        this.setState({cancelLoading:true})
        let url = `https://psipatrol.herokuapp.com/api/udzial/anuluj/${this.props.match.params.id}`;
        let options = {
            method: 'POST',
            headers : authHeader()
            };
        fetch(url,options).then((response) => {
            if(response.status == 200) {
                this.setState({cancelLoading:false, message:"Anulowano twoj udzial w wydarzeniu"});
                window.location.reload();
            }else if(response.status == 409) {
                this.setState({cancelLoading:false, message:"Nie bierzesz udzialu w tym wydarzeniu!"});
                window.location.reload();
            }else{
                this.setState({cancelLoading:false, message:"Wystapil blad. Sprobuj ponownie"});
                window.location.reload();
            }
        }
        )
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

                        

                        {this.state.udzial && (<button class="btn btn-danger btn-lg" onClick={this.handleCancelParticipation} 
                        style={{margin:"5px"}} href="#" role="button">
                            {this.state.cancelLoading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}  Anuluj udział</button>)}

                        {!this.state.isFull && !this.state.udzial && (<button class="btn btn-success btn-lg" onClick={this.handleParticipation} 
                        style={{margin:"5px"}} href="#" role="button">
                        {this.state.submitLoading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )} Weź udział </button>)}
                        
                        <Link to="/wydarzenia"><button class="btn btn-primary btn-lg" 
                        style={{margin:"5px"}} role="button">Wróć do wydarzeń</button></Link>



                        {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
                    </div>
                    
                  )
                  }
            
        </div>
    )
    }
}

export default EventDetails;