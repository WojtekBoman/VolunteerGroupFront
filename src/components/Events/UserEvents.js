import React from 'react';
import EventList from './EventList'
import participationService from '../../services/participation-service'
import EventsFilters from './EventsFilters';

class UserEvents extends React.Component {

    constructor(props) {
        super(props);
        this.updateSearchName = this.updateSearchName.bind(this);
        this.updateSearchPlace = this.updateSearchPlace.bind(this);
        this.updateSearchCategory = this.updateSearchCategory.bind(this);
        this.updateSearchDate = this.updateSearchDate.bind(this);
        this.updateSearchNotFull = this.updateSearchNotFull.bind(this);
        this.clearSearch = this.clearSearch.bind(this);

        this.state = {
            message: "",
            data: [],
            loading: true,
            searchName: '',
            searchPlace: '',
            searchCategory: '',
            searchDate: '',
            searchNotFullChecked: false,
        }
    }

    updateSearchName(event) { this.setState({ searchName: event.target.value.substr(0, 20) }); }
    updateSearchPlace(event) { this.setState({ searchPlace: event.target.value.substr(0, 20) }); }
    updateSearchCategory(event) { this.setState({ searchCategory: event.target.value.substr(0, 20) }); }
    updateSearchDate(event) { this.setState({ searchDate: event.target.value.substr(0, 20) }); }
    updateSearchNotFull(event) { this.setState({ searchNotFullChecked: event.target.checked }); }
    clearSearch() { this.setState({ searchName: '', searchPlace: '', searchCategory: '', searchDate: '', searchNotFullChecked: false, }); }

    async componentDidMount() {

        const { data } = await participationService.getWydarzenia();
        if (data.status == 204) {
            this.setState({ message: "Nie bierzesz udziału w żadnym wydarzeniu !" });
            this.setState({ loading: false });
        } else {
            this.setState({ data });
            this.setState({ loading: false });
        }
    }

    render() {
        const data = this.state.data;
        let filteredIsFull = data;
        if(!!filteredIsFull){
        let filteredName = data.filter((item) => { return item.nazwa.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1 });
        let filteredPlace = filteredName.filter((item) => { return item.miejsce.toLowerCase().indexOf(this.state.searchPlace.toLowerCase()) !== -1 });
        let filteredCategory = filteredPlace.filter((item) => { return item.kategoria.toLowerCase().indexOf(this.state.searchCategory.toLowerCase()) !== -1 });
        let filteredDate = filteredCategory.filter((item) => { return item.dataRozpoczecia.indexOf(this.state.searchDate) !== -1 });
         filteredIsFull = filteredDate.filter((item) => { return (item.czyPelne !== this.state.searchNotFullChecked) || !item.czyPelne });}

        return (<div id="eventMenu" className="container bg-light border rounded border-dark">
            <header>
                <h1>Twoje wydarzenia</h1>
                <hr className="my-4" />

                <EventsFilters nameUpdate={this.updateSearchName} nameState={this.state.searchName}
                    placeUpdate={this.updateSearchPlace} placeState={this.state.searchPlace}
                    categoryUpdate={this.updateSearchCategory} categoryState={this.state.searchCategory}
                    dateUpdate={this.updateSearchDate} dateState={this.state.searchDate}
                    notFullUpdate={this.updateSearchNotFull} notFullState={this.state.searchNotFullChecked}
                    clearSearch={this.clearSearch} />

            </header>
            {this.state.loading ? (
                <div id="loading" className="text-center">
                    <span className="spinner-border spinner-border-lg"></span>
                    <br />
                    <h4>Trwa pobieranie danych ...</h4>
                    <br />
                </div>
            ) : (this.state.message ? (<div>{this.state.message}</div>) : <EventList events={filteredIsFull} />)}
        </div>)
    }
}

export default UserEvents;