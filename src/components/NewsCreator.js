import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authHeader from "../services/auth-header";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          To pole jest wymagane !
        </div>
      );
    }
  };


class NewsCreator extends React.Component {

    constructor(props) {
        super(props);
        this.handleNews = this.handleNews.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.state = {
            naglowek:'',
            opis:'',
            loading: false,
            message: ''
        }
    }
    onChangeTitle(e) {
        this.setState({
          naglowek: e.target.value
        });
      }


      onChangeDescription(e) {
        this.setState({
          opis: e.target.value
        });
      }

      

      handleNews(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
          });


        this.form.validateAll();
        

        if (this.checkBtn.context._errors.length === 0){
            
            const {naglowek,opis} = this.state;
           

            let url = 'https://psipatrol.herokuapp.com/api/newsy';
            let options = {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({naglowek,opis})
          };


          fetch(url,options)
          .then(
            () => {
              this.props.history.push("/");
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
                <Form onSubmit={this.handleNews} ref={c => this.form = c}>
            <div class="form-group">
            <label for="exampleInputEventTitle">Tytuł newsa</label>
            <Input value={this.state.naglowek} validations={[required]} onChange={this.onChangeTitle} type="text" className="form-control" id="exampleInputEventTitle" placeholder="Wprowadź nazwę oferty" validations={[required]}/>
            </div>
            
            <div class="form-group">
                <label for="exampleFormOfferDescription">Opis oferty</label>
                <textarea required value={this.state.opis} validations={[required]} onChange={this.onChangeDescription} class="form-control" id="exampleFormOfferDescription" rows="3"></textarea>
            </div>
        

        <div className="form-group">
              <button
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Dodaj newsa</span>
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

export default NewsCreator;