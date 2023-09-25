import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
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
  const [records, setRecords] = useState<TradingRecordPageType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showWrite, setShowWrite] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stockPrice, setStockPrice] = useState(0);
  const [token,setToken] = useRecoilState(accessTokenAtom);
  const [stockCode, setStockCode] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  

  const formatDateString = (date: string) => {
    return `${date} 00:00:00`;
  };
  const formatDateString2 = (date: string) => {
    return `${date} 23:59:59`;
  };

  const handleCompanySelection = (stockCode: string) => {
    setStockCode(stockCode);
    loadData();
  };

  const debouncedInputValue = useDebounce({
    value: searchKeyword,
    delay: 300, // 디바운스 딜레이 설정 (예: 300ms)
  });

  useEffect(() => {
    //"searchResults"라는 키에 해당하는 쿼리의 캐시가 무효화되고, 새로운 데이터를 가져오게 하는 함수
    queryClient.invalidateQueries("searchResults");
  }, [debouncedInputValue, page]);

  const {
    data: searchResults,
    isLoading,
    isPreviousData,
    isError,
  } = useQuery(
    ["searchResults", searchKeyword, page],
    async () => {
      if (!searchKeyword) {
        return;
      }
      
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACK_API_URL +
            `/api/trade/corp`,
          {
            params: { keyword: searchKeyword, page },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("에러발생:", error);
        throw error;
      }
    },
    {
      enabled: !!searchKeyword, 
    }
  );


  const loadData = () => {
    const params: any = {
      page: page,
    };

    if (startDate && startDate !== "") {
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
        const newData = response.data.content;
        const firstStockCode = response.data.content[0]?.stockCode;
        setStockCode(firstStockCode);
        console.log(newData)

        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setRecords(prevRecords => page === 0 ? newData : [...prevRecords, ...newData]);
          // console.log(records)
          setPage(prevPage => prevPage + 1);
          setIsSubmit(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (!searchKeyword) {
      loadData();
    }
}, [searchKeyword, startDate, endDate, stockCode]); 

  useEffect(() => {
    setPage(0); 
  }, [searchKeyword, startDate, endDate]);

  const fetchMoreData = () => {
    loadData();
  };

  const handleSearchKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
    setRecords([]);
    setHasMore(true);
  };

  const handleSearchDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setRecords([]);
    setHasMore(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    // 검색창에 다시 검색할 때, isSubmit을 false로 초기화해야하나
    setIsSubmit(false);
  };

  const search = () => {
    // useQuery 실행
    queryClient.invalidateQueries("searchResults");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    //기본 제출 동작 방지
    event.preventDefault();
    if (searchKeyword) {
      setIsSubmit(true);
      loadData(); 
    }

    // 검색 키워드가 null이 아니면 submit이 가능하게 하고, submit true로 인식하게 하기
    if (searchKeyword) {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    // searchKeyword가 빈 문자열일 때 loadData 호출
    if (searchKeyword === "") {
        loadData();
    }
}, [searchKeyword]); // searchKeyword 값이 변경될 때마다 useEffect 내부 로직 실행


return (
  <div className={styles.bigcontainer}>

      {showWrite ? (
          <WriteTradingRecord closeWritePage={() => setShowWrite(false)} />
      ) : (
          <><div className={styles.form}>
              <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
                  <FontAwesomeIcon icon={faSearch} color={"var(--main-blue-color)"} />
                  <input
                      type="text"
                      placeholder="매매한 종목 검색"
                      value={searchKeyword}
                      onChange={handleChange}
                      className={styles.inputBox}
                      />
                  <button type="submit" className={styles.searchButton}>
                      search
                  </button>
              </form>
              </div>
                <div className={styles.p}>매매 이유를 작성하면 <div className={styles.yellow}>AI 분석</div>을 받을 수 있어요!</div>
              <div className={styles.datebuttoncontainer}>
                  <h5>기간</h5>
                  <SearchingDate onSearch={handleSearchDate} />
                  <WriteTradingRecordButton onClick={() => setShowWrite(true)} />
              </div>
              {searchKeyword && stockCode ? <ProfitRate stockCode={stockCode} /> : null}
              {!isSubmit && searchResults && (
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
              )}
              {(isSubmit || searchKeyword == '') && (
                  <div>
                      <TradingRecordList
                          records={records ? records : searchResults}
                          hasMore={hasMore}
                          fetchMoreData={fetchMoreData}
                      />
                  </div>
              )}
          </>
      )}
  </div>
);


};

export default TradingRecordPage;
