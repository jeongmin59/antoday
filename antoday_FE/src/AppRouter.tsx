import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanySearchPage from './pages/CompanyInfoPage';
import HomePage from './pages/HomePage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import TradingRecordPage from './pages/TradingRecordPage';
import TradingRecordDetailPage from './pages/TradingRecordDetailPage';
import UpperNavBar from './components/Common/organisms/UpperNavBar';
import LoginPage from './pages/LoginPage';
import LogInRedirectPage from './pages/LogInRedirectPage';


const AppRouter = () => {
  return (
    <Router>
      <UpperNavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<LogInRedirectPage />} />
        <Route path="/companysearch" element={< CompanySearchPage/>} />
        <Route path="/companyinfo/:companyPk" element={<CompanyInfoPage />} />
        <Route path="/tradingrecord" element={<TradingRecordPage />} />
        <Route path="/tradingrecord/:recordPk" element={<TradingRecordDetailPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;