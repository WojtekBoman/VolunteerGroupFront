import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Message = (props) => {
    
        return(
            <Link to={`/wiadomosciSzczegoly/${props.idWiadomosci}`} class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{props.temat}</h5>
              <small class="text-muted">{props.dataWyslania}</small>
            </div>
        <p class="mb-1">{props.tresc}</p>
            <small class="text-muted">{props.nadawca}</small>
          </Link>
        )

        
    }


export default Message;