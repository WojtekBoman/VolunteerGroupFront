import React from 'react';
import ReactDOM from 'react-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth-service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane !
        </div>
      );
    }
  };
  
class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            haslo: "",
            loading: false,
            message: ""
          };
    }

    onChangeUsername(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          haslo: e.target.value
        });
      }
    
      handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
          AuthService.login(this.state.email, this.state.haslo).then(
            () => {
              this.props.history.push("/profile");
              window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        } else {
          this.setState({
            loading: false
          });
        }
      }
    


    render(){
    return (
        <div class="container bg-light border rounded border-dark" id="logForm">
          <header>
            <h2>Logowanie</h2>
            <hr className="my-4"/>
          </header>
        <Form onSubmit={this.handleLogin} ref={c => this.form = c}>
    <div class="form-group">
        <label for="exampleInputEmail1">Adres e-mail</label>
        <Input type="email" className="form-control" value={this.state.email} onChange={this.onChangeUsername} validations={[required]} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Podaj swój adres e-mail"/>
    </div>
    <div class="form-group">
        <label for="exampleInputhaslo1">Hasło</label>
        <Input type="password" value={this.state.haslo} onChange={this.onChangePassword} validations={[required]} className="form-control" id="exampleInputhaslo1" placeholder="Podaj swoje hasło"/>
    </div>
    <div className="form-group">
              <button
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Zaloguj się</span>
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

export default LoginForm;