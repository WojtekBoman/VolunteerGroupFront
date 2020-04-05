import React from 'react';
import ReactDOM from 'react-dom'
import Slider from './Slider';
import NewsList from './NewsList'
import '../styles/form.css'
import validator,{ isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth-service";

const required = value => {
  if (!value) {
    return (

      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        To nie jest poprawny email.
      </div>
    );
  }
};

const vfname = value => {
  if (value.length < 3 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Imię musi zawierać od 3 do 30 znaków.
      </div>
    );
  }
};

const vlname = value => {
    if (value.length < 3 || value.length > 30) {
      return (
        <div className="alert alert-danger" role="alert">
          Nazwisko musi zawierać od 3 do 30 znaków.
        </div>
      );
    }
  };

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Hasło musi zawierać od 6 do 40 znaków.
      </div>
    );
  }
};

const vrepeat = (value) => {
    if(value !== this.state.haslo){
        return (
            <div className="alert alert-danger" role="alert">
              Hasła są różne.
            </div>
        );
    }
}

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
    
        

        this.state = {
            email: "",
            haslo: "",
            powtorzoneHaslo:"",
            imie: "",
            nazwisko: "",
            successful: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeFirstName(e) {
        this.setState({
            imie: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            nazwisko: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            haslo: e.target.value
        })
    }

    onChangeRepeatPassword(e){
        this.setState({
            powtorzoneHaslo: e.target.value
        })
    }

    handleRegister(e) {
       e.preventDefault()

        this.setState({
            message: "",
            successful: false
        });


        this.form.validateAll();
        
        if(this.state.haslo !== this.state.powtorzoneHaslo) {
            this.setState({message : "Hasła są różne."});
            return;
        }

        if(this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.email,
                this.state.haslo,
                this.state.imie,
                this.state.nazwisko
            ).then(
                response => {
                    this.setState({
                        succesful: true,
                        message: response.data.message
                    });
                    console.log(this.state.succesful);
                },
                error =>{
                    const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) || 
                    error.message ||
                    error.toString();
                    this.setState({
                        message: resMessage,
                        succesful: false
                    });
                    console.log(this.state.succesful);
                }
            )
        }

    }

    render(){

    const {succesful} = this.state;
    console.log("Succesful :",succesful);
    return (
        <div class="container bg-light border rounded border-dark" id="regForm">
        <Form onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}>
    
    {!succesful && (
    <div>
      <header>
        <h1>Dołącz do nas</h1>
        <hr className="my-4"/>  
      </header>    
    <div class="form-group">
        <label for="exampleInputEmail1">Adres e-mail</label>
        <Input type="email" value={this.state.email} onChange={this.onChangeEmail} validations={[required, email]} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Podaj adres e-mail"/>
        <small id="emailHelp" class="form-text text-muted">Możesz być pewny że twoje dane będą bezpieczne.</small>
    </div>
    <div class="form-group">
    <label for="exampleInputFirstName">Imię</label>
    <Input type="text" value={this.state.imie} onChange={this.onChangeFirstName} validations={[required, vfname]} className="form-control" id="exampleInputFirstName" placeholder="Podaj swoje imię"/>
    </div>
    <div class="form-group">
    <label for="exampleInputLastName">Nazwisko</label>
    <Input type="text" value={this.state.nazwisko} onChange={this.onChangeLastName} validations={[required, vlname]} className="form-control" id="exampleInputLastName" placeholder="Podaj swoje nazwisko"/>
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Hasło</label>
    <Input type="password" value={this.state.haslo} onChange={this.onChangePassword} validations={[required, vpassword]} className="form-control" id="exampleInputPassword1" placeholder="Podaj hasło"/>
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Powtórz hasło</label>
    <Input type="password" value={this.state.powtorzoneHaslo} validations={[required, vpassword]}  onChange={this.onChangeRepeatPassword} validations={[required, vpassword]} className="form-control" id="exampleInputPassword" placeholder="Podaj swoje hasło"/>
    </div>

    <div className="form-group">
    <Input className="btn btn-dark btn-block" type="submit" value="Zarejestruj się"/>
    </div>
    </div>

    )}

            {this.state.message && !succesful && (
              <div className="form-group">
                <div
                  className={"alert alert-danger"}
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}

            {succesful && (
              <div className="text-center">
                <header>
                  <h3>Dziękujemy za chęć niesienia pomocy !</h3>
                </header>
                <hr className="my-4" />
              <div className="form-group" style={{margin: "125px"}}>
                <div
                  className={"alert alert-success"}
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
              <button type="button" onClick={() => this.props.history.push('/logowanie')} style={{width:"50%"}} className="btn btn-dark">Przejdź do ekranu logowania</button>
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

export default RegisterForm;