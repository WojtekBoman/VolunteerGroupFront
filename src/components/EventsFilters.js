import React from 'react'
import ReactDOM from 'react-dom';
import EventList from './EventList'
import EventsPagination from './EventsPagination'
import eventService from '../services/event-service'

import '../styles/menu.css'

class EventsFilters extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    clearS(){
        
   let x=document.getElementById("kategpriaForm");
    x.options[x.selectedIndex].text='Wszystkie'}


    render() {



        return (
            <div id="filters" class="row text-center font-weight-bold">
                <div class="col-sm-2 d-flex flex-column">
                    <label>Nazwa</label>
                    <input type="text" id="kategoriaFrom" value={this.props.nameState} onChange={this.props.nameUpdate} />
                </div>
                <div class="col-sm-2 d-flex flex-column">
                    <label>Miejsce</label>
                    <input type="text" id="miejsceFrom" value={this.props.placeState} onChange={this.props.placeUpdate} />
                </div>

                <div class="col-sm-2 d-flex flex-column">
                    <label>Data</label>
                    <input type="date" id="dataFrom" value={this.props.dateState} onChange={this.props.dateUpdate}/>
                </div>

                <div class="col-sm-2">
                    <label >Kategoria</label>
                    <select class="form-control" id="kategpriaForm" value={this.state.categoryState} onChange={this.props.categoryUpdate}>
                        <option value="" >Wszystkie</option>
                        <option value="Sprzatanie">Sprzatanie</option>
                        <option value="Inne">Inne</option>


                    </select>
                </div>


                <div class="col-sm-2 d-flex flex-column  align-items-center">
                <label for="notFullFrom">Tylko dostępne </label>
                    <input type="checkbox" id="notFullFrom" name="notFullFrom" checked={this.props.notFullState} onChange={this.props.notFullUpdate}/>
                    
                </div>

                <div class="col-sm-2  d-flex align-items-center">
                    <button class="btn btn-primary" onClick={()=>{this.props.clearSearch();this.clearS();}}> Wyczyść </button>
                    
                </div>



            </div>
        )
    }
}

export default EventsFilters;