import React from 'react'
import ReactDOM from 'react-dom';
import EventList from './EventList'
import EventsPagination from './EventsPagination'
import eventService from '../services/event-service'
import '../styles/menu.css'
import EventsFilters from './EventsFilters';

class EventsMenu extends React.Component {

    constructor(props) {
        super(props);

        this.paginate = this.paginate.bind(this);
        this.updateSearchName=this.updateSearchName.bind(this);
        this.updateSearchPlace=this.updateSearchPlace.bind(this);
        this.updateSearchCategory=this.updateSearchCategory.bind(this);
        this.updateSearchDate=this.updateSearchDate.bind(this);
        this.updateSearchNotFull=this.updateSearchNotFull.bind(this);
        this.clearSearch=this.clearSearch.bind(this);

        this.state = {
            loading: true,
            data: [],
            postPerPage: 2,
            currentPage: 1,
            searchName:'',
            searchPlace:'',
            searchCategory:'',
            searchDate:'',
            searchNotFullChecked:false,
        }
    }

    async receiveEvents() {
        console.log("LOADING", this.state.loading);
        const { data } = await eventService.getWydarzenia();
        this.setState({ data });
        this.setState({ loading: false });
        console.log("LOADING", this.state.loading);
    }

    paginate = (num) => {
        this.setState({ currentPage: num })
    }

    componentDidMount() {
        this.receiveEvents();
    }

    updateSearchName(event) { this.setState({ searchName: event.target.value.substr(0, 20) }); }
    updateSearchPlace(event) { this.setState({ searchPlace: event.target.value.substr(0, 20) }); }
    updateSearchCategory(event) { this.setState({ searchCategory: event.target.value.substr(0, 20) }); }
    updateSearchDate(event) { this.setState({ searchDate: event.target.value.substr(0, 20) }); }
    updateSearchNotFull(event) { this.setState({ searchNotFullChecked: event.target.checked }); }
    clearSearch(){ this.setState({ searchName:'', searchPlace:'', searchCategory:'', searchDate:'', searchNotFullChecked:false,}); }

    render() {

        const { postPerPage, currentPage, data } = this.state
        let filteredIsFull = data;
        if(!!filteredIsFull){
        let filteredName = data.filter((item) => { return item.nazwa.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1 });
        let filteredPlace = filteredName.filter((item) => { return item.miejsce.toLowerCase().indexOf(this.state.searchPlace.toLowerCase()) !== -1 });
        let filteredCategory = filteredPlace.filter((item) => { return item.kategoria.toLowerCase().indexOf(this.state.searchCategory.toLowerCase()) !== -1 });
        let filteredDate = filteredCategory.filter((item) => { return item.dataRozpoczecia.indexOf(this.state.searchDate) !== -1 });
         filteredIsFull = filteredDate.filter((item) => { return (item.czyPelne !== this.state.searchNotFullChecked) || !item.czyPelne });}

        const indexOfLastPost = currentPage * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        const currentPosts = filteredIsFull.slice(indexOfFirstPost, indexOfLastPost);
        console.log("Current posts", currentPosts);


        return (
            <div id="eventMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Aktualne wydarzenia</h1>
                    <hr className="my-4" />
                    <EventsFilters nameUpdate ={this.updateSearchName} nameState={this.state.searchName}
                                    placeUpdate ={this.updateSearchPlace} placeState={this.state.searchPlace} 
                                    categoryUpdate ={this.updateSearchCategory} categoryState={this.state.searchCategory}
                                    dateUpdate ={this.updateSearchDate} dateState={this.state.searchDate}
                                    notFullUpdate ={this.updateSearchNotFull} notFullState={this.state.searchNotFullChecked}
                                    clearSearch={this.clearSearch}/>
                </header>
                {this.state.loading ? (
                    <div id="loading" className="text-center">
                        <span className="spinner-border spinner-border-lg"></span>
                        <br />
                        <h4>Trwa pobieranie danych ...</h4>
                        <br />
                    </div>) : (<div><EventList events={currentPosts} /> <EventsPagination postsPerPage={postPerPage} totalEvents={filteredIsFull.length} paginate={this.paginate} /></div>)
                }
            </div>
        )
    }
}

export default EventsMenu;