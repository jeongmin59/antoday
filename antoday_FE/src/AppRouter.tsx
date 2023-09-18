import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TradingRecordPage from './pages/TradingRecordPage';
import TradingRecordDetailPage from './pages/TradingRecordDetailPage';
import UpperNavBar from './components/Common/templates/UpperNavBar';
import BottomNavbar from './components/Common/templates/BottomNavbar';
import LoginPage from './pages/LoginPage';
import LogInRedirectPage from './pages/LogInRedirectPage';
import WriteTradingRecordPage from './pages/WriteTradingRecordPage';
import StockSearchPage from './pages/StockSearchPage';
import StockInfoPage from './pages/StockInfoPage';


const AppRouter = () => {
  return (
    <Router>
      <UpperNavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<LogInRedirectPage />} />
        <Route path="/stocksearch" element={< StockSearchPage/>} />
        <Route path="/stockinfo/:stockPk" element={<StockInfoPage />} />
        <Route path="/tradingrecord" element={<TradingRecordPage />} />
        <Route path="/tradingrecord/:recordPk" element={<TradingRecordDetailPage />} />
        <Route path="/writetradingrecord" element={<WriteTradingRecordPage />} />
      </Routes>
      <BottomNavbar/>
    </Router>
  );
}

export default AppRouter;