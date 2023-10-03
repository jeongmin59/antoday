import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
// import useDebounce from "../../utils/useDebounce";
import TradingRecordList from "../../components/TradingRecord/template/TradingRecordList";
import WriteTradingRecordButton from "../../components/TradingRecord/atom/WriteTradingRecordButton";
// import SearchInput from "../../components/TradingRecord/template/SearchInput";
// import SearchingDate from "../../components/TradingRecord/template/SearchingDate";
// import TradingCompanyList from "../../components/TradingRecord/module/TradingCompanyList";
import styles from "./TradingRecordPage.module.css";
import { accessTokenAtom } from "../../recoil/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import WriteTradingRecord from "../../components/TradingRecord/template/WriteTradingRecord";
import { useInView } from "react-intersection-observer";

import filterimg from "../../assets/img/trade/filter.png";
import TradeFilter from "../../components/TradingRecord/atom/TradeFilter";

import Alert from './../../components/Common/atom/Alert';
import { isAlertOpenAtom } from "../../recoil/alert";
import { useNavigate } from 'react-router-dom';

export interface TradingRecordPageType {
  cnt: number;
  corpName: string;
  logo_url: string;
  logoUrl: string | null;
  optionBuySell: boolean;
  price: number;
  stockCode: string;
  tradeAt: string;
  tradePk: number;
  reasonExist: boolean;
}

export interface StockRoiType {
  stockCode: string;
  corpName: string;
  cnt: number;
  avgPrice: number;
  profit: number;
  roi: number;
}

const TradingRecordPage: React.FC = () => {
  // list 검색 filter 관련
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteroption, setFilterOption] = useState("");
  const [order, setOrder] = useState("");
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [isOpenFilter, setOpenFilter] = useState<Boolean>(false);
  // list 결과
  const [searchResults, setSearchResults] = useState<TradingRecordPageType[]>(
    []
  );
  const [roiList, setRoiList] = useState<StockRoiType[]>([]);

  const [showWrite, setShowWrite] = useState(false);
  // const queryClient = useQueryClient();
  // const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [hasMore, sethasMore] = useState<boolean>(false);
  const [ref, inView] = useInView();

  const [isLoading, setIsLoading] = useState(false);
  const alertState = useRecoilValue(isAlertOpenAtom);
  const navigate = useNavigate();

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
    if (filteroption) params.tradeFilter = filteroption;
    if (order) params.tradeOrderBy = order;
  
    setIsLoading(true);
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_API_URL}/api/trade`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      if (pageParam === 0) {
        setSearchResults(responseData.content);
      } else {
        setSearchResults((prev) => [...prev, ...responseData.content]);
      }
      return {
        ...responseData,
        nextPage: pageParam + 1,
      };
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoiList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_API_URL}/api/trade/corp/roi`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const roiListData = response.data;
      return roiListData;
    } catch (error) {
      console.error("roiList를 불러오는 중 에러 발생:", error);
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["tradeData", searchKeyword, startDate, endDate, filteroption, order],
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
      // console.log('다음페이지 가져오삼')
    }
  }, [inView, hasNextPage]);

  // 첫 페이지 로딩시 roi리스트 가져오기
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    const getRoiList = async () => {
      try {
        const roiListData = await fetchRoiList();
        setRoiList(roiListData);
      } catch (error) {
        console.log("error", error);
      }
    };

    getRoiList();
  }, []);

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
    console.log("!!!!!!");
    fetchNextPage({ pageParam: 0 });
  };
  // console.log('인뷰',inView )

  const handleOpenFilter = (cur: Boolean) => {
    setOpenFilter(!cur);
  };

  const handleFilterOption = (option: string) => {
    setFilterOption(option);
  };

  const handleOrder = (option: string) => {
    setOrder(option);
  };

  return (
    <div className={styles.bigcontainer}>
      {showWrite ? (
        <WriteTradingRecord closeWritePage={() => setShowWrite(false)} />
      ) : (
        <div className={styles.bigcontainer}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
              <FontAwesomeIcon
                icon={faSearch}
                color={"var(--main-blue-color)"}
              />
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
            {/* <div className={styles.p}>
              매매 이유를 작성하면 <div className={styles.yellow}>AI 분석</div>
              을 받을 수 있어요!
            </div> */}
            <div className={styles.datebuttoncontainer}>
              <div
                className={styles.filter}
                onClick={() => handleOpenFilter(isOpenFilter)}
              >
                <img src={filterimg}></img>
              </div>
              {/* <SearchingDate onSearch={handleSearchDate} /> */}
              <WriteTradingRecordButton onClick={() => setShowWrite(true)} />
            </div>
            {alertState && (
              <>
                {alertState.status === 'write' && (
                  <Alert msg={'일지가 등록되었습니다.'} />
                )}
                {alertState.status === 'edit' && (
                  <Alert msg={'일지가 수정되었습니다.'} />
                )}
                {alertState.status === 'delete' && (
                  <Alert msg={'일지가 삭제되었습니다.'} />
                )}
              </>
            )}
            {isOpenFilter ? (
              <TradeFilter
                handleSearchDate={handleSearchDate}
                handleFilterOption={handleFilterOption}
                handleOrder={handleOrder}
              />
            ) : null}
            <TradingRecordList
              records={searchResults} // searchResults를 전달
              hasMore={hasMore}
              roiList={roiList}
              fetchMoreData={fetchNextPage}
              lastRecordRef={ref}
              isLoading={isLoading} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingRecordPage;
