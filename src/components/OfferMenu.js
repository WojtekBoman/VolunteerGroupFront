import React from 'react'
import authHeader from '../services/auth-header'

class OfferMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            oferty:[]
        }
    }

    async getOffers() {

        let url = 'https://psipatrol.herokuapp.com/api/oferty';
        let options = {
            method: 'GET',
            headers: authHeader()
            }

        fetch(url,options)
        .then(res => res.json())
        .then(res => this.setState({oferty:res}));
    }

    componentDidMount() {

        this.getOffers();


    }

    render() {

        console.log(this.state.oferty);

        return(
            <div id="eventMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Aktualne oferty</h1>
                    <hr className="my-4" />
                </header>
            </div>
        )
    }

}

export default OfferMenu;