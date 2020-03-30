import React from 'react';
import ReactDOM from 'react-dom'
import Slider from './Slider';
import NewsList from './NewsList'

const Home = () => {
    return (
        <div>
            <Slider/>
            <NewsList/>
        </div>
    )
}

export default Home;