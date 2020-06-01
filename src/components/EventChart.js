import React from 'react';
import authHeader from '../services/auth-header';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Bar,Line,Pie} from 'react-chartjs-2';


class EventChart extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeEventType = this.onChangeEventType.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.handleChart = this.handleChart.bind(this);


        this.state = {
            collectionsInMonths:[],
            eventType:"wydarzenia",
            year:2020,
            title:'Wydarzenia w roku 2020',
            loading:false,
            message:'',
            chartData:{
                labels:['Styczeń',
                    'Luty',
                    'Marzec',
                    'Kwiecień',
                    'Maj',
                    'Czerwiec',
                    'Lipiec',
                    'Sierpień',
                    'Wrzesień',
                    'Październik',
                    'Listopad',
                    'Grudzień'],
                datasets:[{
                    label:'Wydarzenia',
                    data:[],
                    backgroundColor:[
                        'blue',
                        'red',
                        'orange',
                        'purple',
                        'lightgreen',
                        'aqua',
                        'grey',
                        'aquamarine',
                        'chocolate',
                        'crimson',
                        'darkcyan',
                        'gold'
                    ]
            }]
            }
        }
    }


    async getStats(year,eventType) {
        this.setState({loading:true})

        let url = `https://psipatrol.herokuapp.com/api/statystyki/${eventType}/${year}`;
        let options = {
            method: 'GET',
            headers: authHeader()
          };

        const collectionsInMonths = []

        fetch(url,options).then(res => {
            if(res.status != 200) {
                this.setState({message:"Wystąpił błąd z pobraniem danych. Przepraszamy za utrudnienia",loading:false});
                console.log("Error")    
                return;
            }
            return res.json()
        })
            .then(res => {
            Object.keys(res).forEach(
            function(activity) {
                collectionsInMonths.push(parseInt(res[activity]))
                
            }
        );
        console.log(res);
        const datasetsCopy = this.state.chartData.datasets.slice(0);
        let dataCopy = datasetsCopy[0].data.slice(0);
        dataCopy = collectionsInMonths
        datasetsCopy[0].data = dataCopy;
        datasetsCopy[0].label = eventType[0].toUpperCase() + eventType.slice(1);
        

        this.setState({
            data: Object.assign({}, this.state.chartData, {
                datasets: datasetsCopy
            }),loading:false
        });
        }
        ).then(err => this.setState({message:err}))

    }

    componentDidMount() {
        this.getStats(this.state.year,this.state.eventType)
    }

    onChangeYear(e) {
        this.setState({year: e.target.value})
    }

    onChangeEventType(e) {
        this.setState({eventType: e.target.value})
    }

    handleChart(e) {
        e.preventDefault();

        this.getStats(this.state.year,this.state.eventType)
        const title = this.state.eventType[0].toUpperCase() + this.state.eventType.slice(1)+" w roku "+this.state.year;
        this.setState({title})
    }

    

    render() {

        console.log("Event type ",this.state.eventType)
      
        return(
            <div className="chart container bg-light border rounded border-dark">
                <header>
                    <h3>{this.state.title}</h3>
                    <hr className="my-4"></hr>
                    </header>

                    <div style={{padding:'30px'}}>
                <Form onSubmit={this.handleChart} ref={c => this.form = c}>
                <label for="yearInput">Rok wydarzeń</label>
                <Input min="2018" max="2020" value={this.state.year} onChange={this.onChangeYear} style={{marginBottom:'30px'}} id="yearInput"  className="form-control" type="number" />
                <div class="form-group">
                <label for="eventTypes">Typ wydarzenia</label>
                    <select class="form-control" id="eventTypes" onChange={this.onChangeEventType}>
                    <option value="wydarzenia">Wydarzenia</option>
                    <option value="zbiorki">Zbiórki</option>
                    </select>
                </div>
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
                </div>
                
                {this.state.message && <h4>{this.state.message}</h4>}

                {!this.state.loading ? (<div>
                <Bar 
                data={this.state.chartData}
                options={{}} />
                <Line 
                data={this.state.chartData}
                options={{}}
                />
                <Pie
                data={this.state.chartData}
                options={{}} />
                </div>)
            
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

export default EventChart;