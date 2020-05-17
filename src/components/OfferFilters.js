import React from 'react'
import ReactDOM from 'react-dom';
import OfferList from './OfferList'
import eventService from '../services/event-service'

import '../styles/menu.css'

class OfferFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }



    render() {



        return (
            <div id="filters" class="row text-center font-weight-bold d-flex justify-content-center">

                <div class="col-sm-3 d-flex flex-column">
                    <label>Tytul</label>
                    <input type="text" id="kategoriaFrom" value={this.props.titleState} onChange={this.props.titleUpdate} />
                </div>

                <div class="col-sm-3 d-flex flex-column">
                    <label>Imię</label>
                    <input type="text" id="miejsceFrom" value={this.props.nameState} onChange={this.props.nameUpdate} />
                </div>

                <div className="col-sm-3 d-flex align-items-end">
                    <button class="btn btn-primary btn-block" onClick={this.props.filterOffers}> Zastosuj filtry </button>
                    
                </div>

            




            </div>
        )
    }
}

export default OfferFilters;