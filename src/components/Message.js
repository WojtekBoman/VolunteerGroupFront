import React from 'react';
import ReactDOM from 'react-dom';

const Message = (props) => {
    
        return(
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{props.temat}</h5>
              <small class="text-muted">3 dni temu</small>
            </div>
        <p class="mb-1">{props.tresc}</p>
            <small class="text-muted">{props.nadawca}</small>
          </a>
        )

        
    }


export default Message;