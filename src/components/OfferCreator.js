import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authHeader from "../services/auth-header"


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane !
        </div>
      );
    }
  };

 


  class OfferCreator extends React.Component {

    constructor(props) {
        super(props);
        this.handleOffer = this.handleOffer.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePetName = this.onChangePetName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeFoto = this.onChangeFoto.bind(this);

        this.state = {
            tytul:'',
            imie:'',
            opis:'',
            zdjecie:'',
            loading: false,
            message: ''
        }
    }
    onChangeTitle(e) {
        this.setState({
          tytul: e.target.value
        });
      }

  
      onChangePetName(e) {
        this.setState({
          imie: e.target.value
        });
      }

      onChangeDescription(e) {
        this.setState({
          opis: e.target.value
        });
      }

      onChangeFoto(e) {
        this.setState({
          zdjecie: e.target.value
        });
      }

      handleOffer(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
          });


        this.form.validateAll();
        

        if (this.checkBtn.context._errors.length === 0){
            
            const {tytul,opis,imie,zdjecie} = this.state;
            const data = {tytul,opis,imie,zdjecie};
            console.log(JSON.stringify({tytul,opis,imie,zdjecie}));

            let url = 'https://psipatrol.herokuapp.com/api/oferty';
            let options = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({tytul,opis,imie,zdjecie})
          };


          fetch(url,options)
          .then(
            () => {
              this.props.history.push("/oferty");
              window.location.reload(false);
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(error.message)
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );

        }else{
            this.setState({loading:false})
        }

      }

    render() {
        return (
            <div class="container bg-light border rounded border-dark" id="createForm">
                <header>
                    <h2>Utwórz nową ofertę</h2>
                    <hr className="my-4"/>
                </header>
                <Form onSubmit={this.handleOffer} ref={c => this.form = c}>
            <div class="form-group">
            <label for="exampleInputEventTitle">Tytuł oferty</label>
            <Input value={this.state.tytul} validations={[required]} onChange={this.onChangeTitle} type="text" className="form-control" id="exampleInputEventTitle" placeholder="Wprowadź nazwę oferty" validations={[required]}/>
            </div>
            
            <div class="form-group">
            <label for="exampleInputPetName">Imię zwierzaka</label>
            <Input value={this.state.imie} validations={[required]} onChange={this.onChangePetName} type="text" className="form-control" id="examplePetName" placeholder="Wprowadź imię zwierzaka" validations={[required]}/>
            </div>

            <div class="form-group">
            <label for="exampleInputPetName">Zdjęcie</label>
            <Input value={this.state.zdjecie} validations={[required]} onChange={this.onChangeFoto} type="text" className="form-control" id="exampleFoto" placeholder="Podaj link do zdjęcia" validations={[required]}/>
            </div>
            
            <div class="form-group">
                <label for="exampleFormOfferDescription">Opis oferty</label>
                <textarea required value={this.state.opis} validations={[required]} onChange={this.onChangeDescription} class="form-control" id="exampleFormOfferDescription" rows="3"></textarea>
            </div>
        

        <div className="form-group">
              <button id="addOfferButton"
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Dodaj ofertę</span>
              </button>
            </div>

        
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />

        </Form>
            </div>
        )
    }

  }

  export default OfferCreator;