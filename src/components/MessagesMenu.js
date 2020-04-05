import React from 'react'
import '../styles/messages.css'
import Message from './Message'

class MessagesMenu extends React.Component {

    render() {
        return(
            <div id="menu" className="container bg-light border rounded border-dark">
                <header>
                    <h2>Twoje wiadomości</h2>
                </header>
                <hr className="my-4" />
                <div class="list-group">
                    <Message/>
                    <Message/>
                    <Message/>
                </div>
            </div>
        )
    }
}

export default MessagesMenu;