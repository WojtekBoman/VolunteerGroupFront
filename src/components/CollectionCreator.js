import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authHeader from "../services/auth-header"
import Collection from './Collection';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane !
        </div>
      );
    }
  };


class CollectionCreator extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBeginningDate = this.onChangeBeginningDate.bind(this);
        this.onChangeEndingDate = this.onChangeEndingDate.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handleCollection = this.handleCollection.bind(this);

        this.state = {
            tytul:'',
            dataRozpoczecia:'',
            dataZakonczenia:'',
            kwotaPotrzebna:0,
            opis:'',
            loading:false,
            message:''
        }
    }

    onChangeTitle(e) {
        this.setState({tytul:e.target.value})
    }

    onChangeBeginningDate(e) {
        this.setState({dataRozpoczecia:e.target.value})
    }

    onChangeEndingDate(e) {
        this.setState({dataZakonczenia:e.target.value})
    }

    onChangeAmount(e) {
        this.setState({kwotaPotrzebna:e.target.value})
    }

    onChangeDescription(e) {
        this.setState({opis:e.target.value})
    }

    handleCollection(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
          });


        if(this.state.dataZakonczenia < this.state.dataRozpoczecia) {
            this.setState({
                message: "Data zakończenia jest wcześniej od daty rozpoczęcia !",
                loading: false
              });

              return;
        }
        

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0){
            
            const {tytul,dataRozpoczecia,dataZakonczenia, kwotaPotrzebna,opis} = this.state;
     

            let url = 'https://psipatrol.herokuapp.com/api/zbiorki';
            let options = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({tytul,opis,dataRozpoczecia,dataZakonczenia,kwotaPotrzebna})
          };


          fetch(url,options)
          .then(
            () => {
              this.props.history.push("/zbiorki");
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
                    <h2>Utwórz nową zbiórkę</h2>
                    <hr className="my-4"/>
                </header>
                <Form onSubmit={this.handleCollection} ref={c => this.form = c}>
            <div class="form-group">
            <label for="exampleInputCollectionTitle">Tytuł zbiórki</label>
            <Input value={this.state.tytul} onChange={this.onChangeTitle} validations={[required]} type="text" className="form-control" id="exampleInputCollectionTitle" placeholder="Wprowadź tytuł zbiórki" validations={[required]}/>
            </div>
            
            <div class="form-group">
            <label for="exampleInputBeginningDate">Data rozpoczęcia</label>
            <Input value={this.dataRozpoczecia} onChange={this.onChangeBeginningDate}  validations={[required]} type="date" className="form-control" id="exampleInputBeginningDate" placeholder="Wprowadź datę rozpoczęcia zbiórki"  validations={[required]}/>
            </div>

            <div class="form-group">
            <label for="exampleInputEndDate">Data zakończenia</label>
            <Input value={this.dataZakonczenia} onChange={this.onChangeEndingDate} validations={[required]} type="date" className="form-control" id="exampleInputEndDate" placeholder="Wprowadź datę zakończenia zbiórki"  validations={[required]}/>
            </div>

            <div class="form-group">
            <label for="exampleInputAmount">Kwota do zebrania</label>
            <Input value={this.state.kwotaPotrzebna} onChange={this.onChangeAmount} validations={[required]} type="number" min="1" className="form-control" id="exampleInputAmount" placeholder="Wprowadź kwotę do zebrania"  validations={[required]}/>
            </div>
            
            <div class="form-group">
                <label for="exampleFormCollectionDescription">Opis zbiórki</label>
                <textarea value={this.state.opis} onChange={this.onChangeDescription} required validations={[required]}  class="form-control" id="exampleFormCollectionDescription" rows="3"></textarea>
            </div>

            <div className="form-group">
              <button
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Dodaj zbiórkę</span>
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


export default CollectionCreator;