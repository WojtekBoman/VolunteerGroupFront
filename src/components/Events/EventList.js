import React from 'react';
import '../../styles/menu.css'
import Event from './Event'

const EventList = (props) => {

    if(props.events) {
        console.log(props.events);
        return (<div className="scrollMenu">
            {props.events.map(event => {
                return <Event key={event.idZdarzenia} data_key={event.idZdarzenia} nazwa={event.nazwa} kategoria={event.kategoria} 
                miejsce={event.miejsce} opis={event.opis} adres={event.adres} dataRozpoczecia={event.dataRozpoczecia}
                liczbaPotrzebnychWolontariuszy={event.liczbaPotrzebnychWolontariuszy} liczbaPrzypisanychWolontariuszy={event.liczbaPrzypisanychWolontariuszy}/>
            })}
        </div>);
    }

    return(
        <div className="scrollMenu">

        </div>
    )

}

export default EventList;