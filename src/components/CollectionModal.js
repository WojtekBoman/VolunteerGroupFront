import React from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap'; 
import authHeader from '../services/auth-header';




class CollectionModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        message:null,
        submitLoading:false,
        transfered:false,
        value:0,
            
    }
    this.handleChange = this.handleChange.bind(this);
  
 
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  closeModal(){
    this.props.onHide();
    window.location.reload();
    this.setState({transfered: false});
  }

  transferMoney(amount, id) {
    this.setState({submitLoading:true,transfered: true})
    let url = 'http://localhost:8080/api/zbiorki/wplac?id='+id+'&kwota='+amount;
    let options = {
        method: 'POST',
        headers : authHeader()
        };
    fetch(url,options).then((response) => {
        if(response.status == 201) {
            this.setState({submitLoading:false,message:"Przelano pomyślnie!"});
        }else if(response.status == 417) {
                this.setState({submitLoading:false,  message:"Exp failed!"});
        }else{
            this.setState({submitLoading:false, message:"Coś poszło nie tak. Sprobuj ponownie."});
           
        }
    }
    );
    
}

  render() {
      console.log("przelewik", this.state.transfered)
      return (
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>{this.props.tytul}</h3>
          </Modal.Title>
        </Modal.Header>
        {this.state.submitLoading ? <div id="loading" className="text-center">
                        <span className="spinner-border spinner-border-lg"></span>
                        <br />
                        <h4>Przelewanie środków....</h4>
                        <br /> </div> :[(!this.state.transfered ?
        <div id="enternig">
        <Modal.Body>
        <div className>
        
      <h5 className=" d-flex justify-content-center align-items-center"> Wpłać wybraną przez siebie kwotę w PLN:</h5>
      </div>
      <Form >
        <Form.Group controlId="formKwota">
            <Form.Control value={this.state.value}  type="number" min="0" placeholder="Wprowadź pełną kwotę" onChange={this.handleChange}/>
            <Form.Control.Feedback type="invalid">
            Spróbój jeszcze raz
          </Form.Control.Feedback>
          
        </Form.Group>
      </Form>
        </Modal.Body>
        <Modal.Footer> 
          <div className="col-sm-12 d-flex justify-content-center"> 
          <Button className="col-sm-6" onClick={()=>this.transferMoney(this.state.value,this.props.idZ)}>Wpłać</Button>
          </div>
        </Modal.Footer>
        </div> :
        <div id="afterTransfer">
       
            <Modal.Body>
       
      <Alert variant="success" className=" w-100 d-flex justify-content-center align-items-center"> <h4>{this.state.message}</h4></Alert>
    
        </Modal.Body>
        <Modal.Footer> 
        <div className="col-sm-12 d-flex justify-content-center"> 
          <Button className="col-sm-6" onClick={()=>this.closeModal()}>OK</Button>
          </div>
        </Modal.Footer>
        </div>
 )] }
      </Modal>


      );
  }
}

export default CollectionModal;