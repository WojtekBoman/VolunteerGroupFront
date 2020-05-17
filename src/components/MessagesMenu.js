import React from 'react'
import '../styles/messages.css'
import authHeader from '../services/auth-header'
import Message from './Message'

class MessagesMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            loading: true,
            messagesType:'odebrane'
        }
    }

    async componentDidMount() {

        let url = 'https://psipatrol.herokuapp.com/api/wiadomosci/odebrane';
        let options = {
            method: 'GET',
            headers: authHeader()
          };
        
        fetch(url,options).then(res => res.json()).then(res => this.setState({messages: res}))
        .catch(err => console.log(err));
            
        this.setState({loading: false})
    }


    render() {

        console.log("Messages", this.state.messages);

        return(
            // <div id="menu" className="container bg-light border rounded border-dark">
            //     <header>
            //         <h2>Twoje wiadomości</h2>
            //     </header>
            //     <hr className="my-4" />
            //         {this.state.messages ? 
            //         (<div className="list-group">{this.state.messages.map((message => <Message temat={message.temat} tresc={message.tresc} nadawca={message.emailNadawcy.email}/>))}</div>) 
            //         :
            //         (<div>Brak wiadomości</div>)   
            //     }
               
            // </div>
            <div class="container bg-light border rounded border-dark" id="menu">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a href="#home" onClick={() => this.setState({messagesType:"odebrane"})} class="nav-link active" data-toggle="tab">Odebrane</a>
        </li>
        <li class="nav-item">
            <a onClick={() => this.setState({messagesType:"wyslane"})} href="#profile" class="nav-link" data-toggle="tab">Wysłane</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="home">
            <h4 class="mt-2">Home tab content</h4>
            <p>Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui. Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
        </div>
        <div class="tab-pane fade" id="profile">
            <h4 class="mt-2">Profile tab content</h4>
            <p>Vestibulum nec erat eu nulla rhoncus fringilla ut non neque. Vivamus nibh urna, ornare id gravida ut, mollis a magna. Aliquam porttitor condimentum nisi, eu viverra ipsum porta ut. Nam hendrerit bibendum turpis, sed molestie mi fermentum id. Aenean volutpat velit sem. Sed consequat ante in rutrum convallis. Nunc facilisis leo at faucibus adipiscing.</p>
        </div>
        <div class="tab-pane fade" id="messages">
            <h4 class="mt-2">Messages tab content</h4>
            <p>Donec vel placerat quam, ut euismod risus. Sed a mi suscipit, elementum sem a, hendrerit velit. Donec at erat magna. Sed dignissim orci nec eleifend egestas. Donec eget mi consequat massa vestibulum laoreet. Mauris et ultrices nulla, malesuada volutpat ante. Fusce ut orci lorem. Donec molestie libero in tempus imperdiet. Cum sociis natoque penatibus et magnis.</p>
        </div>
    </div>
</div>
        )
    }
}

export default MessagesMenu;