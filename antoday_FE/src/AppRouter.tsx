import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CompanySearchPage from './pages/CompanyInfoPage';
import HomePage from './pages/HomePage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import TradingRecordPage from './pages/TradingRecordPage';
import TradingRecordDetailPage from './pages/TradingRecordDetailPage';
import UpperNavBar from './components/Common/atoms/UpperNavBar';

const AppRouter = () => {
  return (
    <Router>
      <UpperNavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companysearch" element={< CompanySearchPage/>} />
        <Route path="/companyinfo/:companyPk" element={<CompanyInfoPage />} />
        <Route path="/tradingrecord" element={<TradingRecordPage />} />
        <Route path="/tradingrecord/:recordPk" element={<TradingRecordDetailPage />} />
      </Routes>
      <BottomNavbarPage />
    </Router>
  );
}

export default AppRouter;