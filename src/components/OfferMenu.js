import React from 'react'
import authHeader from '../services/auth-header'
import OfferList from './OfferList'
import OfferFilters from './OfferFilters';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';

class OfferMenu extends React.Component {

    constructor(props) {
        super(props);
        this.updateSearchTitle = this.updateSearchTitle.bind(this);
        this.updateSearchName = this.updateSearchName.bind(this);
        this.getOffers = this.getOffers.bind(this);

        this.state = {
            loading: true,
            oferty: [],
            searchName: '',
            searchTitle: '',
            postPerPage: 2,
            currentPage: 1,
            notFound: false
        }
    }

    async getOffers(currentPage) {
        console.log("LOADING", this.state.loading);
        this.setState({ loading: true });
        currentPage -= 1;

        let url = 'https://psipatrol.herokuapp.com/api/oferty/filtered?title=' + this.state.searchTitle + '&name=' + this.state.searchName + '&page=' + currentPage + '&size=' + this.state.postPerPage;
        let options = {
            method: 'GET',
            headers: authHeader()
        }

        fetch(url, options)
            .then(response => (response.json()))
            .then((response) => this.setState({
                oferty: response.content, totalPages: response.totalPages, totalElements: response.totalElements,
                currentPage: response.number + 1, loading: false, notFound: false
            }))
            .catch(() => this.setState({ oferty: [], notFound: true, loading: false }));
        console.log("LOADING", this.state.loading);
    }

    componentDidMount() {
        this.getOffers(this.state.currentPage);
    }

    updateSearchName(event) { this.setState({ searchName: event.target.value.substr(0, 20) }); }
    updateSearchTitle(event) { this.setState({ searchTitle: event.target.value.substr(0, 20) }); }

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.getOffers(targetPage);
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.getOffers(firstPage);
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.getOffers(this.state.currentPage - prevPage);
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.postPerPage);
        if (this.state.currentPage < condition) {
            this.getOffers(condition);
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.postPerPage)) {
            this.getOffers(this.state.currentPage + 1);
        }
    };

    render() {
        const { oferty, currentPage, totalPages } = this.state;
        console.log('Oferty', oferty);
        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        return (
            <div id="eventMenu" className="container bg-light border rounded border-dark">
                <header>
                    <h1>Aktualne oferty</h1>
                    <hr className="my-4" />
                    <OfferFilters nameUpdate={this.updateSearchName} nameState={this.state.searchName}
                        titleUpdate={this.updateSearchTitle} titleState={this.state.searchTitle}
                        filterOffers={this.getOffers} />


                </header>

                {(this.state.notFound && !this.state.loading) && (
                    <div>
                        <hr className="my-4"></hr>
                        <div class="alert alert-danger" role="alert">
                            Nie znaleziono żadnych ofert
                  </div>
                    </div>
                )}
                {this.state.loading ? (
                    <div id="loading" className="text-center">
                        <span className="spinner-border spinner-border-lg"></span>
                        <br />
                        <h4>Trwa pobieranie danych ...</h4>
                        <br /> </div>)
                    : (<div> <OfferList offers={oferty} /> </div>)}

                {(oferty.length > 0 && !this.state.loading) ?
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

export default OfferMenu;