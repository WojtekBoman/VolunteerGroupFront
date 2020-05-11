import React from 'react'
import authHeader from '../services/auth-header'
import OfferList from './OfferList'

class OfferMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
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
        .then(res => this.setState({oferty:res, loading:false}));
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

                {this.state.loading ? (
                    <div id="loading" className="text-center">
                        <span className="spinner-border spinner-border-lg"></span>
                        <br />
                        <h4>Trwa pobieranie danych ...</h4>
                        <br /> </div>)
                 : (<div><OfferList offers={this.state.oferty} /></div>) }

            </div>
        )
    }

}

export default OfferMenu;