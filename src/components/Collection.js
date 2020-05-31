import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import CollectionModal from './CollectionModal'

const Collection = (props) => {

    let percentage=0;
    percentage=(props.kwotaZebrana / props.kwotaPotrzebna) * 100;
    percentage =(Math.round(percentage * 100)/100).toFixed(0);
    if(props.kwotaPotrzebna===0) percentage = 0;


    const [modalShow, setModalShow] = React.useState(false);
    const [transfered, setTransfered] = React.useState(false);

   const  showModal=()=> {
         setModalShow(true);
        setTransfered(true);
   }

   const closeModal=()=> {
    setModalShow(false);
   setTransfered(false);
}

    return (
        <div>
            <div class="jumbotron">
                <h1 h1 className="display-4">{props.tytul}</h1>
                <hr className="my-4" />
                <h3 className="pl-2">Zebrano <strong>{props.kwotaZebrana}</strong> z {props.kwotaPotrzebna} zł</h3>
                <div className="pl-2 mt-4 mb-4">
                {
                    percentage<100 ?
                    <ProgressBar className="border" variant="info" now={percentage} label={`${percentage}%`} />
                    :
                    <ProgressBar className="border" variant="success" now={percentage} label={`${percentage}%`} />
                }
                </div>
                <h5 className="pl-2">Od {props.dataRozpoczecia} do {props.dataZakonczenia}</h5>
                <h5 className="pl-2">{props.pracownik}</h5>
                <hr className="my-4" />
                <p>{props.opis}</p>

                <br />
                <Button onClick={() => showModal()} variant="primary" size="lg" block> Wpłać</Button>
                <CollectionModal show={modalShow} onHide={() => closeModal()} tytul={props.tytul} idZ={props.idZbiorki} />

            </div>
        </div>
    )

}

export default Collection;