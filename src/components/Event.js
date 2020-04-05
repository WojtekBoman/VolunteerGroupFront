import React from 'react'
import ReactDOM from 'react-dom';

class Event extends React.Component {

    render(){
        return(
            <div class="jumbotron">
                    <h1 class="display-4">Zbiórka charytatywna </h1>
                    <p class="lead">Wrocław, ul.Pomocy, 12.04.2020r.</p>
                    <hr class="my-4"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p class="lead">
                        <a class="btn btn-success btn-lg" style={{margin:"5px"}} href="#" role="button">Zobacz więcej</a>
                        <a class="btn btn-danger btn-lg" style={{margin:"5px"}} href="#" role="button">Anuluj udział</a>
                    </p>
             </div>
        )
        
    }
}

export default Event;