import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TradingRecordList from '../components/TradingRecord/templates/TradingRecordList';
import WriteTradingRecordButton from '../components/TradingRecord/atoms/WriteTradingRecordButton';
import WriteTradingRecordPage from '../components/TradingRecord/templates/WriteTradingRecord';
import SearchInput from '../components/TradingRecord/templates/SearchInput';
import SearchingDate from '../components/TradingRecord/templates/SearchingDate';


export interface TradingRecordPageType {
  cnt: number;
  corpName: string;
  logo_url: string;
  optionBuySell: boolean;
  price: number;
  stockCode: string;
  tradeAt: string;
  tradePk: number;
}

const TradingRecordPage: React.FC = () => {
  const [records, setRecords] = useState<TradingRecordPageType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showWrite, setShowWrite] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDateString = (date: string) => {
    return `${date} 00:00:00`;
  };

  const createURL = () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
  
    if (startDate && startDate !== "") {
      params.append("start", formatDateString(startDate));
    }
    
    if (endDate && endDate !== "") {
      params.append("end", formatDateString(endDate));
    }
  
    if (searchKeyword && searchKeyword !== "") {
      params.append("keyword", searchKeyword);
    }
  
    return `${import.meta.env.VITE_BACK_API_URL}/api/trade?${params.toString()}`;
  };

  useEffect(() => {
    const url = createURL();

    axios.get(url)
    .then((response) => {
      const newData = response.data.content;
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setRecords(page === 0 ? newData : [...records, ...newData]);
        setPage(page + 1);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, [page, searchKeyword, startDate, endDate]);

  const fetchMoreData = () => setPage(page + 1);
  
  const handleSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
    setPage(0); 
  };
  
  const handleSearchDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setPage(0); 
  };

  return (
    <div>
      <SearchInput onSearch={handleSearchKeyword} />
      <h3>매매 이유를 작성하면 AI 분석을 받을 수 있어요!</h3>
      <SearchingDate onSearch={handleSearchDate} />
      <WriteTradingRecordButton onClick={() => setShowWrite(true)} />
      {showWrite ? (
        <WriteTradingRecordPage closeWritePage={() => setShowWrite(false)} />
      ) : (
        <TradingRecordList records={records} hasMore={hasMore} fetchMoreData={fetchMoreData} />
      )}
    </div>
  );
};

export default TradingRecordPage;
