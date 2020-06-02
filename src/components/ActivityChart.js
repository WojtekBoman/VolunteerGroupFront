import React from 'react';
import authHeader from '../services/auth-header';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {HorizontalBar,Line,Pie} from 'react-chartjs-2';
import Message from './Message';


class ActivityChart extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeCountOfUsers = this.onChangeCountOfUsers.bind(this);
        this.handleChart = this.handleChart.bind(this);

        this.state = {
            message:"",
            countOfUsers:10,
            loading:false,
            chartData:{}
        }
    }

    async getStats(countOfUsers) {
        this.setState({loading:true})

        let url = `https://psipatrol.herokuapp.com/api/statystyki/aktywnosc/${countOfUsers}`;
        let options = {
            method: 'GET',
            headers: authHeader()
          };

        

        fetch(url,options).then(res => {
            if(res.status != 200) {
                this.setState({message:"Wystąpił błąd z pobraniem danych. Przepraszamy za utrudnienia",loading:false});
                console.log("Error")    
                return;
            }
            return res.json()
        }).then(res => {

            const usersArray = [];
            const usersActivity = [];
            const colors = [];

            Object.keys(res).forEach(
                function(user) {
                    usersArray.push(res[user].email)
                    usersActivity.push(res[user].procentowaAktywnosc)
                    colors.push("#" + Math.floor(Math.random()*16777215).toString(16))
                    
                });
            
                const chartData = {
                    labels: usersArray,
                    datasets:[{
                        label:"Aktywność",
                        data:usersActivity,
                        backgroundColor:colors
                    }]
                }

                this.setState({chartData,loading:false})
        }).catch(err => this.setState({message:err}));
    }

    componentDidMount() {
        this.getStats(10);
    }

    onChangeCountOfUsers(e) {
        this.setState({countOfUsers:e.target.value})
    }

    handleChart(e) {
        e.preventDefault();

        this.getStats(this.state.countOfUsers)
    }

    render() {
        return (
            <div className="chart container bg-light border rounded border-dark">
                <header>
                    <h3>Wykres aktywności</h3>
                    <hr className="my-4"></hr>
                    </header>
                    <Form onSubmit={this.handleChart} ref={c => this.form = c}>
                <label for="yearInput">Liczba wolontariuszy</label>
                <Input min="5" max="20" value={this.state.countOfUsers} onChange={this.onChangeCountOfUsers} style={{marginBottom:'30px'}} id="yearInput"  className="form-control" type="number" />
                <button
                style={{marginBottom:'30px'}}
                className="btn btn-block btn-dark"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Wybierz</span>
              </button>
                </Form>

                {this.state.message && <h4>{this.state.message}</h4>}

                   {!this.state.loading ? (<HorizontalBar 
                data={this.state.chartData}
                options={{}} />)
            
             : (
                 <div>
                <span className="spinner-border spinner-border-lg"></span>
                <br />
                <h4>Trwa pobieranie danych ...</h4>
                <br /> </div>
             )} 

            
            </div>
        )
    }

}

export default ActivityChart;