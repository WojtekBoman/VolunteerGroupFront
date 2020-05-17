import React from 'react';
import '../styles/menu.css'
import Offer from './Offer'

const OfferList = (props) => {

    if(props.offers) {
        console.log(props.offers);
        return (<div className="scrollMenu">
            {props.offers.map(offer => {
                return <Offer key={offer.idOferty} data_key={offer.idOferty} tytul={offer.tytul} imie={offer.imie} 
                opis={offer.opis}/>
            })}
        </div>);
    }

    return(
        <div className="scrollMenu">

        </div>
    )

}

export default OfferList;