import React from 'react'
import authHeader from '../services/auth-header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class MessageDetail extends React.Component {

    constructor(props)  {
        super(props);
        
        this.state = {
            message:{},
            loading:true,
            emailNadawcy:'',
            emailAdresata:''
        }
    }

    async componentDidMount() {
        this.setState({cancelLoading:true})
        let url = `https://psipatrol.herokuapp.com/api/wiadomosci/${this.props.match.params.id}`;
        let options = {
            method: 'GET',
            headers : authHeader()
            };

        fetch(url,options).then(res => res.json()).then(res => this.setState({message:res,loading:false,emailNadawcy:res.emailNadawcy.email,
        emailAdresata:res.emailAdresata.email}));
    }

    render() {

        console.log(this.state)

        return(
            <div className="container bg-light border rounded border-dark" id="messageDetailMenu">

                {this.state.loading && (<div id="loading" className="text-center">
                  <span className="spinner-border spinner-border-lg"></span>
                  <br/>
                  <h4>Trwa pobieranie danych ...</h4>
                  <br />
                  </div>)}

                  {this.state.message && !this.state.loading && (
                      <div>
                    <header>
                        <h3>{this.state.message.temat}</h3>
                        <hr className="my-4"></hr>
                    </header>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Data : {this.state.message.dataWyslania}</li>
                    <li class="list-group-item">Od : {this.state.emailNadawcy}</li>
                    <li class="list-group-item">Do : {this.state.emailAdresata}</li>
                    </ul>

                    <br></br>
                    <h5>Treść</h5>
                    <p>{this.state.message.tresc}</p>
                    <br></br>
                    <Link to="/wiadomosci"><button type="button" class="btn btn-dark">Powrót</button></Link>
                    </div>
                  )}

                  
            </div>
        )
    }
}

export default MessageDetail;