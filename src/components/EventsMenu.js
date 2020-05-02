import React from 'react'
import ReactDOM from 'react-dom';
import EventList from './EventList'
import EventsPagination from './EventsPagination'
import eventService from '../services/event-service'
import '../styles/menu.css'

class EventsMenu extends React.Component {

    constructor(props){
        super(props);

        this.paginate = this.paginate.bind(this);

        this.state = {
            loading: true,
            data: [],
            postPerPage: 2,
            currentPage: 1
        }
    }

    async receiveEvents() {
        console.log("LOADING",this.state.loading);
        const {data} = await eventService.getWydarzenia();
        this.setState({data});
        this.setState({loading: false});
        console.log("LOADING",this.state.loading);
    }

    paginate = (num) => {
        this.setState({currentPage: num})
    }

    componentDidMount() {
        this.receiveEvents();
    }

    render() {

        const {postPerPage,currentPage,data} = this.state

        const indexOfLastPost = currentPage * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost);
        console.log("Current posts", currentPosts);


        return (
            <div id="eventMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Aktualne wydarzenia</h1>
                    <hr className="my-4" />
                </header>
                {this.state.loading ? (
                  <div id="loading" className="text-center">
                  <span className="spinner-border spinner-border-lg"></span>
                  <br/>
                  <h4>Trwa pobieranie danych ...</h4>
                  <br />
                  </div>) : (<div><EventList events={currentPosts}/> <EventsPagination postsPerPage={postPerPage} totalEvents={data.length} paginate={this.paginate}/></div>)
                }
            </div>
        )
    }
}

export default EventsMenu;