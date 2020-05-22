import React from 'react'
import Collection from './Collection'

const CollectionList = (props) => {

    if(props.zbiorki) {
        console.log(props.zbiorki)
       return(
       <div>
           {props.zbiorki.map(zbiorka => {
               return <Collection key={zbiorka.idZbiorki} tytul={zbiorka.tytul} opis={zbiorka.opis} 
               kwotaPotrzebna={zbiorka.kwotaPotrzebna} kwotaZebrana={zbiorka.kwotaZebrana} pracownik={zbiorka.idPracownika.email}
               dataRozpoczecia={zbiorka.dataRozpoczecia} dataZakonczenia={zbiorka.dataZakonczenia} />
           })}
        </div>
       )
    }

    return(
        <div>

        </div>
    )
}

export default CollectionList;