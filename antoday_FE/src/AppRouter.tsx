import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TradingRecordPage from "./pages/TradePage/TradingRecordPage";
import TradingRecordDetailPage from "./pages/TradePage/TradingRecordDetailPage";
import UpperNavBar from "./components/Common/template/UpperNavBar";
import BottomNavbar from "./components/Common/template/BottomNavbar";
import LoginPage from "./pages/CommonPage/LoginPage";
import LogInRedirectPage from "./pages/CommonPage/LogInRedirectPage";
import WriteKeywordAndReasonPage from "./pages/TradePage/WriteKeywordAndReasonPage";
import StockSearchPage from "./pages/StockPage/StockSearchPage";
import InfoPageSearchBar from "./components/StockInfo/template/InfoPageSearchBar";
import { useRecoilValue } from "recoil";
import { isMemoOpenAtom } from "./recoil/memo";
import EditTradingRecordPage from "./pages/TradePage/EditTradingRecordPage";
import styles from "./AppRouter.module.css";

const AppRouter = () => {
  const isMemoOpen = useRecoilValue(isMemoOpenAtom);

  return (
    <Router>
      <UpperNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback/kakao" element={<LogInRedirectPage />} />
        <Route path="/stocksearch" element={<StockSearchPage />} />
        <Route path="/stockinfo/:stockPk" element={<InfoPageSearchBar />} />
        <Route path="/tradingrecord" element={<TradingRecordPage />} />
        <Route
          path="/tradingrecord/:tradePk"
          element={<TradingRecordDetailPage />}
        />
        <Route
          path="/tradingrecord/edit/:tradePk"
          element={<EditTradingRecordPage />}
        />
        {/* <Route
          path="/writetradingrecord"
          element={<WriteTradingRecordPage />}
        /> */}
        <Route
          path="/writetradingrecord/:tradePk"
          element={<WriteKeywordAndReasonPage />}
        />
      </Routes>
      <BottomNavbar />
    </Router>
  );
};

export default AppRouter;
