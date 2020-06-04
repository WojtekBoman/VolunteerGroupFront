import React from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "../styles/doggoPhoto.css"

class DogEncyclopedia extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeBreedOfDog = this.onChangeBreedOfDog.bind(this);
        this.handleDogPicture = this.handleDogPicture.bind(this);

        this.state = {
            loading:false,
            dogPhoto:"",
            foundDog:"",
            breedOfDog:"",
            message:"",
            displaySecondWindow:false
        }
    }

    onChangeBreedOfDog(e) {
        this.setState({breedOfDog:e.target.value})
    }

    handleDogPicture(e) {
        e.preventDefault();

        this.setState({loading:true,displaySecondWindow:true})

        let {breedOfDog} = this.state;

        const foundDog = breedOfDog;

        breedOfDog = breedOfDog.toLowerCase();
        breedOfDog = breedOfDog.replace(/\s/g, '');

        console.log("Rasa",breedOfDog)

        let url = `https://dog.ceo/api/breed/${breedOfDog}/images/random`;
        let options = {
            method: 'GET'
          };

        fetch(url,options).
        then(
            res => res.json()
            )
        .then(res => {
            if(res.code != 404) {
                this.setState({dogPhoto:res.message,loading:false,foundDog,message:''});
            }else {
                this.setState({message:"Nie znaleziono psa o podanej rasie :(",loading:false,dogPhoto:null,foundDog:null});
            }
            }
            );

    }

    render() {
        return(
            <div>
            <div className="container bg-light border rounded border-dark" id="encyclopedyForm">
                <Form onSubmit={this.handleDogPicture}>
                <div class="form-group">
                <label for="exampleInputBreedOfDog">Rasa psa</label>
                <Input type="text" className="form-control" value={this.state.breedOfDog} onChange={this.onChangeBreedOfDog}  id="exampleInputBreedOfDog" placeholder="Podaj rasę do wyszukania"/>
                </div>
                <button
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Szukaj</span>
              </button>
                </Form>
                </div>

                {this.state.displaySecondWindow && (

                        <div className="text-center container bg-light border rounded border-dark" style={{marginBottom:"50px"}}> 
                        {this.state.loading && (
                            <div id="loading">
                            <span className="spinner-border spinner-border-lg"></span>
                            <br />
                            <h4>Trwa pobieranie danych ...</h4>
                            <br /> </div>
                            
                        )}

                        {this.state.dogPhoto && (
                            <div id="doggoPhoto">
                                <header>
                                    <h3>{this.state.foundDog}</h3>
                                    <hr className="my-4"></hr>
                                </header>
                            <img src={this.state.dogPhoto} alt={this.state.breedOfDog} className="rounded mx-auto d-block rounded border border-dark"/>
                            <h5>Wyszukaj jeszcze raz aby zobaczyć inne zdjęcie !</h5>
                            </div>
                        )}

                        {this.state.message && (
                            <div>
                                <h3>
                                {this.state.message}
                                </h3>
                            </div>
                        )}

                        </div>

                )}
                    
            </div>
            
        )
    }

}

export default DogEncyclopedia;