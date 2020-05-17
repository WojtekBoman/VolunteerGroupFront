import React from 'react'
import '../styles/messages.css'
import authHeader from '../services/auth-header'
import Message from './Message'

class MessagesMenu extends React.Component {

    constructor(props) {
        super(props);
        this.loadMessages = this.loadMessages.bind(this);

        this.state = {
            messages: [],
            loading: true,
            messagesType:'odebrane'
        }
    }

    async loadMessages(messagesType) {

        let url = `https://psipatrol.herokuapp.com/api/wiadomosci/${messagesType}`;
        let options = {
            method: 'GET',
            headers: authHeader()
          };
        
        fetch(url,options).then(res => res.json()).then(res => this.setState({messages: res}))
        .catch(err => console.log(err));
            
        this.setState({loading: false})
    }

    componentDidMount() {

        this.loadMessages("odebrane");
    }


    render() {

        console.log("Messages",this.state.messages)

        return(
            <div class="container bg-light border rounded border-dark" id="messageMenu">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a href="#home" onClick={() => this.loadMessages("odebrane")} class="nav-link active" data-toggle="tab">Odebrane</a>
        </li>
        <li class="nav-item">
            <a  onClick={() => this.loadMessages("wyslane")} href="#profile" class="nav-link" data-toggle="tab">Wysłane</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="home">
                 <header>
                    <h2>Odebrane wiadomości</h2>
                </header>
                <hr className="my-4" />
                    {this.state.messages ? 
                   (<div className="list-group">{this.state.messages.map((message => <Message key={message.idWiadomosci} 
                    idWiadomosci={message.idWiadomosci} temat={message.temat} tresc={message.tresc} nadawca={message.emailNadawcy.email}/>))}</div>) 
                    :
                    (<div>Brak wiadomości</div>)   
                }
        </div>
        <div class="tab-pane fade" id="profile">
            <header>
                    <h2>Wysłane wiadomości</h2>
                </header>
                <hr className="my-4" />
                    {this.state.messages ? 
                   (<div className="list-group">{this.state.messages.map((message => <Message key={message.idWiadomosci} idWiadomosci={message.idWiadomosci} temat={message.temat} tresc={message.tresc} nadawca={message.emailNadawcy.email}/>))}</div>) 
                    :
                    (<div>Brak wiadomości</div>)   
                }
        </div>
        </div>
    </div>
        )
    }
}

export default MessagesMenu;