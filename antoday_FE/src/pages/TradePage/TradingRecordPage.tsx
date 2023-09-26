import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
// import useDebounce from "../../utils/useDebounce";
import TradingRecordList from "../../components/TradingRecord/template/TradingRecordList";
import WriteTradingRecordButton from "../../components/TradingRecord/atom/WriteTradingRecordButton";
// import SearchInput from "../../components/TradingRecord/template/SearchInput";
import SearchingDate from "../../components/TradingRecord/template/SearchingDate";
import ProfitRate from "../../components/TradingRecord/template/ProfitRate";
// import TradingCompanyList from "../../components/TradingRecord/module/TradingCompanyList";
import styles from "./TradingRecordPage.module.css";
import { accessTokenAtom } from "../../recoil/auth";
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import WriteTradingRecord from '../../components/TradingRecord/template/WriteTradingRecord';
import { useInView } from 'react-intersection-observer';

export interface TradingRecordPageType {
  cnt: number;
  corpName: string;
  logo_url: string;
  logoUrl: string|null;
  optionBuySell: boolean;
  price: number;
  stockCode: string;
  tradeAt: string;
  tradePk: number;
  reasonExist: boolean;
}

const TradingRecordPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showWrite, setShowWrite] = useState(false);
  const [stockCode, setStockCode] = useState<string | null>(null);
  // const queryClient = useQueryClient();
  // const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [searchResults, setSearchResults] = useState<TradingRecordPageType[]>([]);
  const [hasMore, sethasMore] = useState<boolean>(false);
  const [ref, inView] = useInView();
  

  

  const formatDateString = (date: string, isStart: boolean = true) => {
    return isStart ? `${date} 00:00:00` : `${date} 23:59:59`;
  };

  // const handleCompanySelection = (stockCode: string) => {
  //   setStockCode(stockCode);
  //   loadData();
  // };

  // const debouncedInputValue = useDebounce({
  //   value: searchKeyword,
  //   delay: 300, // 디바운스 딜레이 설정 (예: 300ms)
  // });

  const fetchData = async ({ pageParam = 0 }) => {
    const params: any = {
      page: pageParam,
    };
    if (startDate) params.start = formatDateString(startDate);
    if (endDate) params.end = formatDateString(endDate, false);
    if (searchKeyword) params.keyword = searchKeyword;

    const response = await axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/trade`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response.data;
    if (pageParam === 0) {
      setSearchResults(responseData.content);
    } else {
      setSearchResults(prev => [...prev, ...responseData.content]);
    }
    if (responseData.content.length > 0) {
      setStockCode(responseData.content[0].stockCode);
    } else {
      setStockCode(null);
    }
    return {
      ...responseData,
      nextPage: pageParam + 1,
    };
  };
  

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["tradeData", searchKeyword, startDate, endDate],
    fetchData,
    {
      getNextPageParam: (lastPage) => {
        // 현재 페이지가 마지막 페이지보다 작다면 다음 페이지 번호 반환
        if (!lastPage.isLast) {
          return !lastPage.last ? lastPage.nextPage : undefined;
        } 
        // 그렇지 않다면, undefined 반환하여 페이지 로딩 중지
        return undefined;
      },
      // enabled: searchKeyword,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  

  
  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();  
    fetchNextPage({ pageParam: 0 });
};

const handleInputClick = () => {
    setSearchKeyword("");  
};

const handleSearchDate = (start: string, end: string) => {
  setStartDate(start);
  setEndDate(end);
  fetchNextPage({ pageParam: 0 });
};
// console.log('인뷰',searchResults)

return (
  <div className={styles.bigcontainer}>

      {showWrite ? (
          <WriteTradingRecord closeWritePage={() => setShowWrite(false)} />
      ) : (
          <>
            <div className={styles.form}>
            <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
                  <FontAwesomeIcon icon={faSearch} color={"var(--main-blue-color)"} />
                  <input
                      type="text"
                      placeholder="종목명, 키워드 검색"
                      value={searchKeyword}
                      onChange={handleInputChange}
                      onClick={handleInputClick}
                      className={styles.inputBox}
                      />
                  <button type="submit" className={styles.searchButton}>
                      search
                  </button>
              </form>
            </div>
            <div className={styles.indexContainer}>
              <div className={styles.p}>매매 이유를 작성하면 <div className={styles.yellow}>AI 분석</div>을 받을 수 있어요!</div>
              <div className={styles.datebuttoncontainer}>
                <span>기간</span>
                <SearchingDate onSearch={handleSearchDate} />
                <WriteTradingRecordButton onClick={() => setShowWrite(true)} />
              </div>
              {stockCode ? <ProfitRate stockCode={stockCode} /> : null}
                  <TradingRecordList
                    records={searchResults}  // searchResults를 전달
                    hasMore={hasMore}
                    fetchMoreData={fetchNextPage}
                    lastRecordRef={ref}
                  />
    </div>

          </>
      )}
  </div>
);};

export default TradingRecordPage;
