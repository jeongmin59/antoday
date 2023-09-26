import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import useDebounce from "../../utils/useDebounce";
import TradingRecordList from "../../components/TradingRecord/template/TradingRecordList";
import WriteTradingRecordButton from "../../components/TradingRecord/atom/WriteTradingRecordButton";
import SearchInput from "../../components/TradingRecord/template/SearchInput";
import SearchingDate from "../../components/TradingRecord/template/SearchingDate";
import ProfitRate from "../../components/TradingRecord/template/ProfitRate";
import TradingCompanyList from "../../components/TradingRecord/module/TradingCompanyList";
import styles from "./TradingRecordPage.module.css";
import { accessTokenAtom } from "../../recoil/auth";
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import WriteTradingRecord from '../../components/TradingRecord/template/WriteTradingRecord'

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
  const queryClient = useQueryClient();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [searchResults, setSearchResults] = useState<TradingRecordPageType[]>([]);

  

  const formatDateString = (date: string, isStart: boolean = true) => {
    return isStart ? `${date} 00:00:00` : `${date} 23:59:59`;
  };

  // const handleCompanySelection = (stockCode: string) => {
  //   setStockCode(stockCode);
  //   loadData();
  // };

  const debouncedInputValue = useDebounce({
    value: searchKeyword,
    delay: 300, // 디바운스 딜레이 설정 (예: 300ms)
  });

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
      data: responseData.content,
      hasMore: !responseData.last
    };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["tradeData", searchKeyword, startDate, endDate],
    fetchData,
    {
      getNextPageParam: (lastPageData, pages) => {
        if(lastPageData.hasMore) {
          return pages.length;
        } else {
          return undefined;
        }
      },
      // enabled: searchKeyword,
    }
  );
  
  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();  // prevent the form from submitting
    fetchNextPage({ pageParam: 0 });
};

const handleInputClick = () => {
    setSearchKeyword("");  // Clear the input when clicked
};

const handleSearchDate = (start: string, end: string) => {
  setStartDate(start);
  setEndDate(end);
  fetchNextPage({ pageParam: 0 });
};
// console.log(stockCode)
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
              {/* {!isSubmit && searchResults && (
                <div className={styles.searchcompanylist}>
                    <TradingCompanyList
                        searchResults={searchResults}
                        isLoading={isLoading}
                        isPreviousData={isPreviousData}
                        isError={isError}
                        nowPage={page}
                        setNowPage={setPage}
                        totalPage={hasMore ? page + 1 : page}
                        loadData={loadData}
                        onSelectCompany={handleCompanySelection}
                        sourcePage="TradingRecordPage"
                    />
                </div>
              )} */}
                  <TradingRecordList
                    records={searchResults}  // searchResults를 전달
                    hasMore={hasNextPage}
                    fetchMoreData={fetchData}
                  />
    </div>

          </>
      )}
  </div>
);};

export default TradingRecordPage;
