import React from 'react';
import ReactDOM from 'react-dom'
import News from './News'

class NewsList extends React.Component {

    render() {
            return (
                <div class="container">
                    <News/>
                    <News/>
                    <News/>
                </div>
            )
    }
}

export default NewsList; 