import React, { useState } from 'react';
import SearchInput from '../components/TradingRecord/templates/SearchInput';
import Explanation from '../components/TradingRecord/templates/Explanation';
import TradingRecordList from '../components/TradingRecord/templates/TradingRecordList';
import axios from 'axios';

interface TradingRecord {
    stock_code: string;
    corp_name: string;
    logo_url: string;
    trade_at: string;
    price: number;
    cnt: number;
    키워드_작성_여부: boolean;
}


const TradingRecordPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<TradingRecord[]>([]);
    const [searched, setSearched] = useState(false); // 검색을 아직 수행하지 않은 경우를 나타내는 상태 변수

    // 검색 요청을 처리하는 함수
    const handleSearch = (keyword: string) => {
        axios.get(`${process.env.REACT_APP_API}/api/trade/search?keyword=${keyword}`)
        .then((response) => {
            // 응답을 받았을 때 처리
            const searchResultsData: TradingRecord[] = response.data; 
            setSearchResults(searchResultsData);
            setSearched(true); // 검색을 수행한 경우 true로 설정
        })
        .catch((error) => {
            // 에러 처리
            console.error('API 요청 중 오류 발생:', error);
        });
    };

    return (
        <div>
            <h1>거래 기록 페이지</h1>
            <SearchInput onSearch={handleSearch} />
            <Explanation />
            {searched && searchResults.length === 0 && <p>검색 결과가 없습니다.</p>}
            {searched && searchResults.length > 0 && <TradingRecordList records={searchResults} />}
        </div>
    );
};

export default TradingRecordPage;
