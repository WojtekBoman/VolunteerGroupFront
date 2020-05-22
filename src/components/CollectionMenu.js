import React from 'react'
import authHeader from '../services/auth-header'
import CollectionList from './CollectionList'

class CollectionMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            collections:[]
        }
    }

    async componentDidMount() {

        this.setState({loading:true})

        let url = 'https://psipatrol.herokuapp.com/api/zbiorki';
        let options = {
            method: 'GET',
            headers: authHeader()
        }

        fetch(url,options)
        .then(res => res.json()).then(res => this.setState({collections:res,loading:false}))

    }

    render() {
        return (
            <div id="collectionMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Zbiórki</h1>
                    <hr className="my-4"></hr>  
                </header>
                {this.state.loading ? (
                    <div id="loading" className="text-center">
                        <span className="spinner-border spinner-border-lg"></span>
                        <br />
                        <h4>Trwa pobieranie danych ...</h4>
                        <br /> </div>)
                    : (<div> <CollectionList zbiorki={this.state.collections}/> </div>)}
            </div>
        )
    }
}

export default CollectionMenu;