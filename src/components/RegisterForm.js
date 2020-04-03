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
        This field is required!
      </div>
    
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vfname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vlname = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vrepeat = (value) => {
    if(value !== this.state.haslo){
        return (
            <div className="alert alert-danger" role="alert">
              Passwords are different;
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
            this.setState({message : "Passwords are different"});
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
    return (
        <div class="container bg-light border rounded border-dark" id="regForm">
        <Form onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}>
    
    {!this.state.successful && (
    <div>    
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <Input type="email" value={this.state.email} onChange={this.onChangeEmail} validations={[required, email]} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
    <label for="exampleInputFirstName">First name</label>
    <Input type="text" value={this.state.imie} onChange={this.onChangeFirstName} validations={[required, vfname]} className="form-control" id="exampleInputFirstName" placeholder="First name"/>
    </div>
    <div class="form-group">
    <label for="exampleInputLastName">Last name</label>
    <Input type="text" value={this.state.nazwisko} onChange={this.onChangeLastName} validations={[required, vlname]} className="form-control" id="exampleInputLastName" placeholder="Last name"/>
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <Input type="password" value={this.state.haslo} onChange={this.onChangePassword} validations={[required, vpassword]} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Repeat password</label>
    <Input type="password" value={this.state.powtorzoneHaslo} validations={[required, vpassword]}  onChange={this.onChangeRepeatPassword} validations={[required, vpassword]} className="form-control" id="exampleInputPassword" placeholder="Repeat password"/>
    </div>

    <div className="form-group">
    <Input className="btn btn-primary btn-block" type="submit" value="Register"/>
    </div>
    </div>

    )}

            {this.state.message && !this.state.succesful && (
              <div className="form-group">
                <div
                  className={"alert alert-primary"}
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}

            {this.state.succesful && (
              <div className="form-group">
                <div
                  className={"alert alert-success"}
                  role="alert"
                >
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

export default RegisterForm;