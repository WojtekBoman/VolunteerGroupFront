import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/news.css'

const News = (props) => {

        return (
            <div class="jumbotron border rounded border-success">
                <h1 class="display-4">{props.naglowek}</h1>
                <p class="lead">Autor : <span>Przewodniczący 1</span></p>
                <p class="lead">Data : <span>{props}</span></p>
                <hr class="my-4"/>
                <p>{props.tresc}</p>
            </div>
        )
    
}

export default News;