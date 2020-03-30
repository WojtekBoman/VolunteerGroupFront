import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/news.css'

class News extends React.Component {

    render() {
        return (
            <div class="jumbotron border rounded border-success">
                <h1 class="display-4">Powstaje nowe schronisko na krzykach !</h1>
                <p class="lead">Autor : <span>Przewodniczący 1</span></p>
                <p class="lead">Data : <span>12.04.2020</span></p>
                <hr class="my-4"/>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus sit harum inventore saepe minima ipsum, corporis alias obcaecati quibusdam ipsa qui et amet necessitatibus ipsam culpa dignissimos perspiciatis reprehenderit libero!</p>
            </div>
        )
    }
}

export default News;