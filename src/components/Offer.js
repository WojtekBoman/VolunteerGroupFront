import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Link} from "react-router-dom";

const Offer = (props) => {


        

        return(
            <div class="jumbotron">
                    <h1 className="display-4">{props.tytul}</h1>
                    <h3 className="pl-2">{props.imie}</h3>                  
                    <hr className="my-4"/>
                    <p>{props.opis}</p>
                  
             </div>
        )
        
    }


export default Offer;