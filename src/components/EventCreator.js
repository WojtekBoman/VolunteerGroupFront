import React from 'react';
import ReactDOM from 'react-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import eventService from "../services/event-service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane !
        </div>
      );
    }
  };

  const moreThanZero = value => {
    if (value < 1 ) {
      return (
        <div className="alert alert-danger" role="alert">
          Musisz wybrać wartość większą od zera.
        </div>
      );
    }
  };

class EventCreator extends React.Component {

    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePlace = this.onChangePlace.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onChangeBeginningDate = this.onChangeBeginningDate.bind(this);
        this.onChangeNeedVoluunters = this.onChangeNeedVoluunters.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            loading: false,
            message:'',
            nazwa:'',
            miejsce:'',
            kategoria:'Sprzatanie',
            adres:'',
            dataRozpoczecia:'',
            liczbaPotrzebnychWolontariuszy:0,
            opis:''
        }
    }

    onChangeName(e) {
        this.setState({
          nazwa: e.target.value
        });
      }

      onChangePlace(e) {
        this.setState({
          miejsce: e.target.value
        });
      }

    onChangeCategory(e) {
        this.setState({
          kategoria: e.target.value
        });
      }

      onChangeAdress(e) {
        this.setState({
          adres: e.target.value
        });
      }

      onChangeBeginningDate(e) {
        this.setState({
        dataRozpoczecia: e.target.value
        });
      }

      onChangeNeedVoluunters(e) {
        this.setState({
        liczbaPotrzebnychWolontariuszy: e.target.value
        });
      }

      onChangeDescription(e) {
        this.setState({
        opis: e.target.value
        });
      }

      handleEvent(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
          });


        this.form.validateAll();
        
        if (this.checkBtn.context._errors.length === 0){
            eventService.postWydarzenia(this.state.nazwa,
                this.state.miejsce,
                this.state.adres,
                this.state.opis,
                this.state.liczbaPotrzebnychWolontariuszy,
                this.state.kategoria,
                this.state.dataRozpoczecia).then(
                    () => {
                      this.props.history.push("/wydarzenia");
                      window.location.reload();
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

    render(){

        console.log(this.state);

        return(
        <div class="container bg-light border rounded border-dark" id="createForm">
        <header>
                <h2>Utwórz nowe wydarzenie</h2>
                <hr className="my-4"/>
         </header>
         <Form onSubmit={this.handleEvent} ref={c => this.form = c}>
            <div class="form-group">
            <label for="exampleInputEventName">Nazwa wydarzenia</label>
            <Input value={this.state.nazwa} onChange={this.onChangeName} type="text" className="form-control" id="exampleInputEventName" placeholder="Wprowadź nazwę wydarzenia" validations={[required]}/>
            </div>
            <div class="form-group">
            <label for="exampleInputEventName">Miejsce</label>
            <Input value={this.state.miejsce} onChange={this.onChangePlace} type="text" className="form-control" id="exampleInputEventName" placeholder="Wprowadź miejsce wydarzenia" validations={[required]}/>
            </div>
            <div class="form-group">
            <label for="exampleSelect1">Kategoria wydarzenia</label>
            <select value={this.state.kategoria} onChange={this.onChangeCategory} class="form-control" id="exampleSelect1">
                <option value="Sprzatanie" selected>Sprzątanie</option>
                <option value="Inne">Inne</option>
            </select>
            <div class="form-group">
                <label for="exampleInputAddress">Adres wydarzenia</label>
                <Input value={this.state.adres} onChange={this.onChangeAdress} type="text" className="form-control" id="exampleInputAddress" placeholder="Wprowadź adres wydarzenia" validations={[required]}/>
            </div>
            <div class="form-group">
                <label for="exampleInputDate">Data wydarzenia</label>
                <Input value={this.state.dataRozpoczecia} onChange={this.onChangeBeginningDate} type="date" className="form-control" id="exampleInputDate" validations={[required]}/>
            </div>
            <div class="form-group">
                <label for="exampleInputNeedVolunteers">Liczba potrzebnych wolontariuszy</label>
                <Input value={this.state.liczbaPotrzebnychWolontariuszy} onChange={this.onChangeNeedVoluunters} type="number" className="form-control" id="exampleInputNeedVolunteers" 
                placeholder="Wprowadź liczbę potrzebnych wolontariuszy" validations={[required,moreThanZero]}/>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Opis wydarzenia</label>
                <textarea validations={[required]} value={this.state.opis} onChange={this.onChangeDescription} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        </div>

        <div className="form-group">
              <button
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Dodaj wydarzenie</span>
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

export default EventCreator;