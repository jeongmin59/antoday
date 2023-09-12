import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const Home = () => {
    return (
        <Link to='/'>
        <div>
            <img src="/Home.png" alt="" />
            <div>Home</div>
        </div>
        </Link>
    )
};

export default Home;