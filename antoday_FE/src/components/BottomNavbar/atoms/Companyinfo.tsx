import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const Companyinfo = () => {
    return (
        <Link to='/companysearch'>
        <div>
            <img src="/company.png" alt="" />
            <div>기업 정보</div>
        </div>
        </Link>
    )
}

export default Companyinfo;
