import React from 'react'

const Collection = (props) => {

    return (
        <div>
            <div class="jumbotron">
            <h1  h1 className="display-4">{props.tytul}</h1>        
            <h3 className="pl-2">Do zebrania {props.kwotaPotrzebna} zł</h3>
            <h5 className="pl-2">Od {props.dataRozpoczecia} do {props.dataZakonczenia}</h5>        
            <h5 className="pl-2">{props.pracownik}</h5>          
                    <hr className="my-4"/>
                <p>{props.opis}</p>
                  
             </div>
        </div>
    )

}

export default Collection;