import React from 'react'
import ReactDOM from 'react-dom';
import EventList from './EventList'
import authHeader from '../../services/auth-header'
// import EventsPagination from './EventsPagination'
// import {FontAwesomeIcon,faAngleRight,faAngleLeft,faAngleDoubleLeft, faAngleDoubleRight}  from '@fortawesome/react-fontawesome';
// import { faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import eventService from '../../services/event-service'
import '../../styles/menu.css'
import EventsFilters from './EventsFilters';

class EventsMenu extends React.Component {

    constructor(props) {
        super(props);

        // this.paginate = this.paginate.bind(this);
        this.updateSearchName=this.updateSearchName.bind(this);
        this.updateSearchPlace=this.updateSearchPlace.bind(this);
        this.updateSearchCategory=this.updateSearchCategory.bind(this);
        this.updateBeginSearchDate=this.updateBeginSearchDate.bind(this);
        this.updateEndSearchDate=this.updateEndSearchDate.bind(this);
        this.updateSearchNotFull=this.updateSearchNotFull.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.filter = this.filter.bind(this);
        // this.nextPage = this.nextPage.bind(this);

        this.state = {
            loading: true,
            posts: [],
            postPerPage: 2,
            currentPage: 1,
            searchName: '',
            searchPlace: '',
            searchCategory: '',
            searchBeginDate: '',
            searchEndDate: '',
            searchNotFullChecked: false,
            notFound:false
        }
    }

    async receiveEvents(currentPage) {
        console.log("LOADING", this.state.loading);
        this.setState({loading:true});
        currentPage -= 1;
        let url = 'https://psipatrol.herokuapp.com/api/wydarzenia/filtered?name&place&category&onlyAvailable&endDate&beginDate&size=' + this.state.postPerPage + '&page=' + currentPage;
        let options = {
            method: 'GET',
            headers: authHeader()
          };
        fetch(url, options)
            .then(response => response.json()).then((response) => this.setState({
                posts: response.content, totalPages: response.totalPages, totalElements: response.totalElements,
                currentPage: response.number + 1, loading: false
            }))
            .catch(err => console.log(err));
        console.log("LOADING", this.state.loading);
      
    }

    async filter(currentPage) {
        console.log("LOADING", this.state.loading);
        this.setState({loading:true});
        currentPage -= 1;
        let url = 'https://psipatrol.herokuapp.com/api/wydarzenia/filtered?name='+this.state.searchName+
                                                                        '&place='+this.state.searchPlace+
                                                                        '&category='+this.state.searchCategory+
                                                                        '&onlyAvailable='+this.state.searchNotFullChecked+
                                                                        '&endDate='+this.state.searchEndDate+
                                                                        '&beginDate='+this.state.searchBeginDate+
                                                                        '&size=' + this.state.postPerPage + '&page=' + currentPage;
        let options = {
            method: 'GET',
            headers: authHeader()
          };
        fetch(url, options)
        .then(response => (response.json()))
        .then((response) => this.setState({
                posts: response.content, totalPages: response.totalPages, totalElements: response.totalElements,
                currentPage: response.number + 1, loading: false,notFound:false
            }))
        .catch(() => this.setState({posts:[],notFound:true,loading:false}));
        console.log("LOADING", this.state.loading);
   
      
    }

    // paginate = (num) => {
    //     this.setState({ currentPage: num })
    // }

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.filter(targetPage);
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.filter(firstPage);
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.filter(this.state.currentPage - prevPage);
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.postPerPage);
        if (this.state.currentPage < condition) {
            this.filter(condition);
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.postPerPage)) {
            this.filter(this.state.currentPage + 1);
        }
    };

    componentDidMount() {
        this.receiveEvents(this.state.currentPage);
    }

    updateSearchName(event) { this.setState({ searchName: event.target.value.substr(0, 20) }); }
    updateSearchPlace(event) { this.setState({ searchPlace: event.target.value.substr(0, 20) }); }
    updateSearchCategory(event) { this.setState({ searchCategory: event.target.value.substr(0, 20) }); }
    updateBeginSearchDate(event) { this.setState({ searchBeginDate: event.target.value.substr(0, 20) }); }
    updateEndSearchDate(event) { this.setState({ searchEndDate: event.target.value.substr(0, 20) }); }
    updateSearchNotFull(event) { this.setState({ searchNotFullChecked: event.target.checked }); }
    clearSearch() { this.setState({ searchName: '', searchPlace: '', searchCategory: '', searchBeginDate: '1000-01-01',searchEndDate:'3000-01-01', searchNotFullChecked: false, }); }

    render() {

        const { posts, currentPage, totalPages } = this.state;

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        // const { postPerPage, currentPage, data } = this.state
        // let filteredIsFull = data;
        // if(!!filteredIsFull){
        // let filteredName = data.filter((item) => { return item.nazwa.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1 });
        // let filteredPlace = filteredName.filter((item) => { return item.miejsce.toLowerCase().indexOf(this.state.searchPlace.toLowerCase()) !== -1 });
        // let filteredCategory = filteredPlace.filter((item) => { return item.kategoria.toLowerCase().indexOf(this.state.searchCategory.toLowerCase()) !== -1 });
        // let filteredDate = filteredCategory.filter((item) => { return item.dataRozpoczecia.indexOf(this.state.searchDate) !== -1 });
        //  filteredIsFull = filteredDate.filter((item) => { return (item.czyPelne !== this.state.searchNotFullChecked) || !item.czyPelne });}

        // const indexOfLastPost = currentPage * postPerPage;
        // const indexOfFirstPost = indexOfLastPost - postPerPage;
        // const currentPosts = filteredIsFull.slice(indexOfFirstPost, indexOfLastPost);
        // console.log("Current posts", currentPosts);

        console.log("Posts",posts)
        return (
            <div id="eventMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Aktualne wydarzenia</h1>
                    <hr className="my-4" />
                    <EventsFilters nameUpdate ={this.updateSearchName} nameState={this.state.searchName}
                                    placeUpdate ={this.updateSearchPlace} placeState={this.state.searchPlace} 
                                    categoryUpdate ={this.updateSearchCategory} categoryState={this.state.searchCategory}
                                    beginDateUpdate ={this.updateBeginSearchDate} endDateState={this.state.updateEndSearchDate}
                                    notFullUpdate ={this.updateSearchNotFull} notFullState={this.state.searchNotFullChecked}
                                    clearSearch={this.clearSearch} filterEvents={this.filter}/>
                </header>
                {(this.state.notFound && !this.state.loading )&& (
                    <div>
                        <hr className="my-4"></hr>
                    <div class="alert alert-danger" role="alert">
                    Nie znaleziono żadnych wydarzeń
                  </div>
                  </div>
                )}
                {this.state.loading ? (
                    <div id="loading" className="text-center">
                        <span className="spinner-border spinner-border-lg"></span>
                        <br />
                        <h4>Trwa pobieranie danych ...</h4>
                        <br /> </div>)
                 : (<div> <EventList events={posts} /> </div>) }
                 {/* tu coś nie tego xd */}
                        {/* <EventsPagination postsPerPage={postPerPage} totalEvents={posts.length} paginate={this.paginate} /> */}
                    
                


                {(posts.length > 0 && !this.state.loading) ?
                    <Card.Footer>
                        <div style={{ "float": "left" }}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{ "float": "right" }}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}>
                                        {/* <FontAwesomeIcon icon={faAngleDoubleLeft} /> */}
                                         First
                                        </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.prevPage}>
                                        {/* <FontAwesomeIcon icon={faAngleLeft} /> */}
                                         Prev
                                        </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss} className={"bg-light"} name="currentPage" value={currentPage}
                                    onChange={this.changePage} readOnly="true" />
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.nextPage}>
                                        {/* <FontAwesomeIcon icon={faAngleRight} />  */}
                                        Next
                                        </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.lastPage}>
                                        {/* <FontAwesomeIcon icon={faAngleDoubleRight} />  */}
                                        Last
                                        </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer> : null
                }
            </div>
        )
    }
}

export default EventsMenu;