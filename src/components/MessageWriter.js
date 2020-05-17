import React from 'react'
import authHeader from '../services/auth-header'
import AuthService from '../services/auth-service'
import Message from './Message';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane !
        </div>
      );
    }
  };

class MessageWriter extends React.Component {

    constructor(props) {
        super(props);

        this.handleMessage = this.handleMessage.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeRecipient = this.onChangeRecipient.bind(this);

        this.state = {
            loading: false,
            message: '',
            tresc: '',
            odbiorca: '',
            temat: ''
        }
    }

    handleMessage(e) {

        e.preventDefault();

        this.setState({
            message: "",
            loading: true
          });


        this.form.validateAll();
        

        if (this.checkBtn.context._errors.length === 0){
            
            const {temat,tresc,odbiorca} = this.state;
            // console.log(JSON.stringify({tytul,opis,imie}));

            let url = `https://psipatrol.herokuapp.com/api/wiadomosci/wyslij/${odbiorca}`;
            let options = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({temat,tresc})
          };

          fetch(url,options)
          .then(
            (res) => {
              // this.props.history.push("/wiadomosci");
              // window.location.reload(false);
              if(res.status === 400) {
                this.setState({
                  loading:false,
                  message: "Nie ma takiego użytkownika"
                })
              }else {
              this.props.history.push("/wiadomosci");
              window.location.reload(false);
              }
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
          ).catch(res => console.log("Catch",res));

        }else{
            this.setState({loading:false})
        }

    }


    onChangeTopic(e) {
        this.setState({
            temat: e.target.value
        })
        
    }

    onChangeMessage(e) {
        this.setState({
            tresc: e.target.value
        })
      
    }

    onChangeRecipient(e) {
        this.setState({
            odbiorca: e.target.value
        })
       
    }

    render() {
        return (
            <div class="container bg-light border rounded border-dark" id="createForm">
                    <header>
                        <h2>Wyślij wiadomość</h2>
                        <hr className="my-4"></hr>
                    </header>
                    <Form onSubmit={this.handleMessage} ref={c => this.form = c}>
                    <div class="form-group">
                        <label for="exampleInputRecipient">Adres e-mail adresata</label>
                         <Input type="email" className="form-control" value={this.state.odbiorca} onChange={this.onChangeRecipient} validations={[required]} id="exampleInputRecipient" aria-describedby="emailHelp" placeholder="Podaj adres e-mail adresata"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputTopic">Temat wiadomości</label>
                        <Input type="text" value={this.state.temat} onChange={this.onChangeTopic} validations={[required]} className="form-control" id="exampleInputTopic" placeholder="Podaj temat wiadomości"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormMessage">Treść wiadomości</label>
                        <textarea required value={this.state.tresc} validations={[required]} onChange={this.onChangeMessage} class="form-control" id="exampleFormMessage" rows="3"></textarea>
                    </div>

                    <div className="form-group">
              <button
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Wyślij wiadomość</span>
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

export default MessageWriter;