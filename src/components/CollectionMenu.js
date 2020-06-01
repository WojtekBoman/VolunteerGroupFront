import React from 'react'
import authHeader from '../services/auth-header'
import CollectionList from './CollectionList'
import CollectionFilters from './CollectionFilters';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';

class CollectionMenu extends React.Component {

    constructor(props) {
        super(props);
        this.updateSearchTitle = this.updateSearchTitle.bind(this);
        this.getCollections = this.getCollections.bind(this);
        
        this.state = {
            loading: true,
            collections:[],
            searchTitle: '',
            postPerPage: 2,
            currentPage: 1,
            notFound: false
        }
    }

    async componentDidMount() {

    this.getCollections(this.state.currentPage);

    }

    async getCollections(currentPage){
        console.log("LOADING", this.state.loading);
        this.setState({ loading: true });
        currentPage -= 1;

        let url = 'https://psipatrol.herokuapp.com/api/zbiorki/filtered?title=' + this.state.searchTitle +'&page=' + currentPage + '&size=' + this.state.postPerPage;
        let options = {
            method: 'GET',
            headers: authHeader()
        }

        fetch(url, options)
            .then(response => (response.json()))
            .then((response) => this.setState({
                collections: response.content, totalPages: response.totalPages, totalElements: response.totalElements,
                currentPage: response.number + 1, loading: false, notFound: false
            }))
            .catch(() => this.setState({ collections: [], notFound: true, loading: false }));
        console.log("LOADING", this.state.loading);
    }

    updateSearchTitle(event) { this.setState({ searchTitle: event.target.value.substr(0, 20) }); }

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.getCollections(targetPage);
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.getCollections(firstPage);
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.getCollections(this.state.currentPage - prevPage);
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.postPerPage);
        if (this.state.currentPage < condition) {
            this.getCollections(condition);
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.postPerPage)) {
            this.getCollections(this.state.currentPage + 1);
        }
    };

    render() {
        const {collections, currentPage, totalPages } = this.state;
        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };
        return (
            <div id="collectionMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Zbiórki</h1>
                    <hr className="my-4"></hr>  
                    <CollectionFilters titleUpdate={this.updateSearchTitle} titleState={this.state.searchTitle}
                        filterCollections={this.getCollections} />
                </header>
                {(this.state.notFound && !this.state.loading) && (
                    <div>
                        <hr className="my-4"></hr>
                        <div class="alert alert-danger" role="alert">
                            Nie znaleziono żadnych zbórek
                  </div>
                    </div>
                )}
                {this.state.loading ? (
                    <div id="loading" className="text-center">
                        <span className="spinner-border spinner-border-lg"></span>
                        <br />
                        <h4>Trwa pobieranie danych ...</h4>
                        <br /> </div>)
                    : (<div> <CollectionList zbiorki={collections} /> </div>)}

                {(collections.length > 0 && !this.state.loading) ?
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

export default CollectionMenu;