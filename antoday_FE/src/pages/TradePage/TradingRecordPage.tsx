import React, { useEffect, useState } from "react";
import axios from "axios";
import TradingRecordList from "../../components/TradingRecord/template/TradingRecordList";
import WriteTradingRecordButton from "../../components/TradingRecord/atom/WriteTradingRecordButton";
import WriteTradingRecordPage from "../../components/TradingRecord/template/WriteTradingRecord";
import SearchInput from "../../components/TradingRecord/template/SearchInput";
import SearchingDate from "../../components/TradingRecord/template/SearchingDate";
import styles from "./TradingRecordPage.module.css";
import { accessTokenAtom } from "../../recoil/auth";
import { useRecoilState } from 'recoil';

export interface TradingRecordPageType {
  cnt: number;
  corpName: string;
  logo_url: string;
  optionBuySell: boolean;
  price: number;
  stockCode: string;
  tradeAt: string;
  tradePk: number;
  reasonExist: boolean;
}

const TradingRecordPage: React.FC = () => {
  const [records, setRecords] = useState<TradingRecordPageType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showWrite, setShowWrite] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stockPrice, setStockPrice] = useState(0);
  const [token,setToken] = useRecoilState(accessTokenAtom);

  const formatDateString = (date: string) => {
    return `${date} 00:00:00`;
  };
  const formatDateString2 = (date: string) => {
    return `${date} 23:59:59`;
  };

  // const createURL = () => {
  //   const params = new URLSearchParams();
  //   params.append("page", page.toString());

  //   if (startDate && startDate !== "") {
  //     params.append("start", formatDateString(startDate));
  //   }

  //   if (endDate && endDate !== "") {
  //     // console.log(endDate)
  //     params.append("end", formatDateString2(endDate));
  //   }

  //   if (searchKeyword && searchKeyword !== "") {
  //     params.append("keyword", searchKeyword);
  //   }

  //   return `${import.meta.env.VITE_BACK_API_URL}/api/trade?${params.toString()}`;
  // };

  useEffect(() => {
    // console.log(
    //   "useEffect is running",
    //   page,
    //   searchKeyword,
    //   startDate,
    //   endDate
    // );
    const params: any = {
      page: page,
    };
    // console.log("useEffect triggered", startDate, endDate);
    if (startDate && startDate !== "") {
      // console.log(startDate)
      params.start = formatDateString(startDate);
    }

    if (endDate && endDate !== "") {
      params.end = formatDateString2(endDate);
    }

    if (searchKeyword && searchKeyword !== "") {
      params.keyword = searchKeyword;
    }

    axios
      .get(`${import.meta.env.VITE_BACK_API_URL}/api/trade`, {
        params: params,
        headers: {
          Authorization : `Bearer ${token}`
        }
      })
      .then((response) => {
        // console.log("API response:", response);
        const newData = response.data.content;
        // console.log(newData)
        if (newData.length === 0) {
          setHasMore(false);
          // setRecords([]);
        } else {
          setHasMore(true);
          setRecords(page === 0 ? newData : [...records, ...newData]);
          setPage(page + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, searchKeyword, startDate, endDate]);

  const fetchMoreData = () => {
    // console.log("Fetching more data!");
    setPage(page + 1);
  };

  const handleSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
    setPage(0);
    setRecords([]);
    setHasMore(true);
  };

  const handleSearchDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setPage(0);
    setRecords([]);
    setHasMore(true);
  };

  return (
    <div>
      <SearchInput onSearch={handleSearchKeyword} />
      <h5>매매 이유를 작성하면 AI 분석을 받을 수 있어요!</h5>

      {showWrite ? (
        <WriteTradingRecordPage closeWritePage={() => setShowWrite(false)} />
      ) : (
        <div>
          <div className={styles.datebuttoncontainer}>
            <h5>기간</h5>
            <SearchingDate onSearch={handleSearchDate} />
            <WriteTradingRecordButton onClick={() => setShowWrite(true)} />
          </div>
          <TradingRecordList
            records={records}
            hasMore={hasMore}
            fetchMoreData={fetchMoreData}
          />
        </div>
      )}
    </div>
  );
};

export default TradingRecordPage;
