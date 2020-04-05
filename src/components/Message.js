import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {
    
    render() {
        return(
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Dziękujemy za udział w zbiórce !</h5>
              <small class="text-muted">3 dni temu</small>
            </div>
            <p class="mb-1">Dzięki twojej pomocy psy ze schroniska na krzykach otrzymały zapas karmy na pół roku.</p>
            <small class="text-muted">Przewodniczący</small>
          </a>
        )

        
    }
}

export default Message;