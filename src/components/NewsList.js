import React from 'react';
import ReactDOM from 'react-dom'
import authHeader from '../services/auth-header'
import News from './News'

class NewsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newsy:null,
            message:''
        }
    }

    componentDidMount() {
        this.setState({loading:true});

        let url = 'https://psipatrol.herokuapp.com/api/newsy';
        let options = {
            method: 'GET'
        }

        fetch(url,options).then(res => 
            {
                if(res.status == 200){
                    return res.json();
                }else {
                    this.setState({message:"Usługa chwilowo niedostępna. Spróbuj ponownie za jakiś czas"})
                    return;
                }
            
            }
            ).then(res => this.setState({newsy:res}))
        
    }

    render() {

        console.log("Newsy",this.state.newsy);

            return (
                <div class="container">
                    {this.state.newsy && (this.state.newsy.map(news => 
                    <News key={news.idNewsa}  dataDodania={news.dataDodania} tresc={news.tresc} naglowek={news.naglowek} />))}

                    {this.state.message && 
                    (
                    <div class="jumbotron border rounded border-success"> 
                    <h3>{this.state.message}</h3>
                    </div>
                    )}
                </div>
            )
    }
}

export default NewsList; 