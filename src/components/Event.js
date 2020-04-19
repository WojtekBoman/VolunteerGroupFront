import React from 'react'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Event = (props) => {

        return(
            <div class="jumbotron">
                    <h1 class="display-4">{props.nazwa}</h1>
                    <h3>{props.kategoria}</h3>
                    <p class="lead">{props.miejsce}</p>
                    <p class="lead">{props.dataRozpoczecia}</p>
                    <p class="lead">{props.data_key}</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="4"
                        aria-valuemin="0" aria-valuemax={props.liczbaPotrzebnychWolontariuszy} style={{width:"70%"}}>
                            <span class="sr-only"></span>
                        </div>
                    </div>
                    <hr class="my-4"/>
                    <p>{props.opis}</p>
                    <p class="lead">
                        <Link to={"eventDetails/"+props.data_key}><button class="btn btn-success btn-lg" style={{margin:"5px"}} href={"/eventDetails/:"+props.data_key} role="button">Zobacz więcej</button></Link>
                        <a class="btn btn-danger btn-lg" style={{margin:"5px"}} href="#" role="button">Anuluj udział</a>
                    </p>
             </div>
        )
        
    }


export default Event;