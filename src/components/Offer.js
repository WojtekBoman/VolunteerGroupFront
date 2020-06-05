import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";

const Offer = (props) => {

    return (
        <div class="jumbotron bg-" >


            <div className="bg- row">

                <div className="bg- col-md-7">
                    <h1 className="display-4">{props.tytul}</h1>
                    <h3 className="pl-2">{props.imie}</h3>
                    <hr className="my-4" />
                    <p>{props.opis}</p>
                </div>

                <div className="bg- col-md-5 text-center">
                    <img className="shadow-lg p-1 bg-white rounded" src={props.zdjecie} width="360" height="220" alt="Coś poszło nie tak" />
                </div>
            </div>






        </div>
    )

}


export default Offer;