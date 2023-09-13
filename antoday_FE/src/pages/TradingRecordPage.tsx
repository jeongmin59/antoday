import React, { useState, useEffect } from 'react';
import SearchInput from '../components/TradingRecord/templates/SearchInput';
import Explanation from '../components/TradingRecord/templates/Explanation';
import TradingRecordList from '../components/TradingRecord/templates/TradingRecordList';
import axios from 'axios';

// TradingRecordPage.tsx

interface TradingRecordPageType {
    cnt: number;
    corpName: string;
    logo_url: string;
    optionBuySell: boolean, // true로 고정되어 있던 것을 boolean으로 변경
    price: number, // 0으로 고정되어 있던 것을 number로 변경
    stockCode: string, // "string"으로 고정되어 있던 것을 string으로 변경
    tradeAt: string, // "2023-09-13T08:39:47.123Z"로 고정되어 있던 것을 string으로 변경
    tradePk: number // 0으로 고정되어 있던 것을 number로 변경
}



const TradingRecordPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<TradingRecordPageType[]>([]);
    const [searched, setSearched] = useState(false); 
    const currentDate = new Date();
    const endDate = currentDate.toISOString().split('T')[0]; 

    const startDateDate = new Date();
    startDateDate.setDate(currentDate.getDate() - 30); 
    const startDate = startDateDate.toISOString().split('T')[0]; 

    const [page, setPage] = useState(1);
    const [stockCode, setStockCode] = useState("AAPL");


    const handleSearch = (keyword: string) => {
        axios.get(`${process.env.REACT_APP_BACK_API_URL}/api/trade/search?keyword=${keyword}`)
        .then((response) => {
            const searchResultsData: TradingRecordPageType[] = response.data; 
            setSearchResults(searchResultsData);
            setSearched(true); 
        })
        .catch((error) => {
            console.error(error);
        });
    };  

    useEffect(() => {
        getList();
    }, []); 

    const getList = () => {
        axios.get(`${process.env.REACT_APP_BACK_API_URL}/api/trade?start=${startDate}&end=${endDate}&page=${page}&stock_code=${stockCode}`)
        .then((response) => {
            const listResultsData: TradingRecordPageType[] = response.data; 
            setSearchResults(listResultsData);
            setSearched(true); 
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <div>
            <h1>거래 기록 페이지</h1>
            <SearchInput onSearch={handleSearch} />
            <Explanation />
            {searched && searchResults.length === 0 && <p>검색 결과가 없습니다.</p>}
            {searched && searchResults.length > 0 && <TradingRecordList records={searchResults} />}
            {!searched && <TradingRecordList records={searchResults} />}
        </div>
    );
};

export default TradingRecordPage;
