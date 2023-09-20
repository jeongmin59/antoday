import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TradingRecordPage from "./pages/TradePage/TradingRecordPage";
import TradingRecordDetailPage from "./pages/TradePage/TradingRecordDetailPage";
import UpperNavBar from "./components/Common/templates/UpperNavBar";
import BottomNavbar from "./components/Common/templates/BottomNavbar";
import LoginPage from "./pages/CommonPage/LoginPage";
import LogInRedirectPage from "./pages/CommonPage/LogInRedirectPage";
import WriteTradingRecordPage from "./pages/TradePage/WriteTradingRecordPage";
import StockSearchPage from "./pages/StockPage/StockSearchPage";
import StockInfoPage from "./pages/StockPage/StockInfoPage";

const AppRouter = () => {
  return (
    <Router>
      <UpperNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<LogInRedirectPage />} />
        <Route path="/stocksearch" element={<StockSearchPage />} />
        <Route path="/stockinfo/:stockPk" element={<StockInfoPage />} />
        <Route path="/tradingrecord" element={<TradingRecordPage />} />
        <Route
          path="/tradingrecord/:recordPk"
          element={<TradingRecordDetailPage />}
        />
        <Route
          path="/writetradingrecord"
          element={<WriteTradingRecordPage />}
        />
      </Routes>
      <BottomNavbar />
    </Router>
  );
};

export default AppRouter;
