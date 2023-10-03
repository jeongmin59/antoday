  import React, { useState, useEffect, useCallback } from 'react';
  import { useNavigate } from 'react-router-dom';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import styles from './WriteTradingRecord.module.css';
  import SearchingCompany from './SearchingCompany';
  import axios from 'axios';
  import { accessTokenAtom } from '../../../recoil/auth';
  import { useRecoilState } from 'recoil';
// import KeywordInput from '../../TradingDairy/modules/KeywordInput';
import { ko } from "date-fns/esm/locale";
import { addCommas } from '../../../utils/addCommas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";


  interface WriteTradingRecordPageProps {
    closeWritePage: () => void;
  }

  interface Company {
    stockCode: number;
    corpName: string;
    logoUrl: string;
  }


  const WriteTradingRecord: React.FC<WriteTradingRecordPageProps> = ({ closeWritePage }) => {
    const navigate = useNavigate();
    const adjustInitialDate = (date: Date): Date => {
      let adjusted = new Date(date);
      if (adjusted.getDay() !== 0 && adjusted.getDay() !== 6 && date.getHours() < 9) {
        adjusted.setDate(adjusted.getDate() - 1);
      }
      while (adjusted.getDay() === 0 || adjusted.getDay() === 6) {
        adjusted.setDate(adjusted.getDate() - 1);
      }
      
      return adjusted;
    }
    const today = new Date();
    const initialAdjustedDate = adjustInitialDate(today);
    const [selectedDate, setSelectedDate] = useState<Date>(initialAdjustedDate);
    const [selectedOption, setSelectedOption] = useState<string>('매수');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [stockPrice, setStockPrice] = useState<number | null>(null);
    const [adjustedPrice, setAdjustedPrice] = useState<number | undefined>(undefined);
    const [stockQuantity, setStockQuantity] = useState(1);
    const [ownedCompanies, setOwnedCompanies] = useState<Company[]>([]);
    const [token, setToken] = useRecoilState(accessTokenAtom);
    const [forceRender, setForceRender] = useState(0);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isChoose,setIsChoose] = useState<boolean>(false);
    const [netCount, setNetCount] = useState<number>(0);
    const finalPrice = addCommas(adjustedPrice);



    const tradingData = {
      selectedDate,
      selectedCompany,
      selectedOption,
      adjustedPrice,
      stockQuantity,
    };

    const formatDateToCustom = (date: Date) => {
      if (!date) return '';
            const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = "03";
      const minutes = "41";
      const seconds = "16";
      
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }
    
    


    const gotowritetradingrecord = async () => {
      let errorMessage = null;
    
      if (!selectedCompany) {
        errorMessage = "회사를 선택해주세요.";
        console.log('회사선택안함');
      } else if (stockQuantity <= 0) {
        errorMessage = "주식 개수를 입력해주세요.";
        console.log('주식개수안함');
      } if (selectedOption === '매도' && selectedCompany && stockQuantity > netCount) {
        errorMessage = `현재 보유 수량: ${netCount}`;
    }
      if (errorMessage) {
        setAlertMessage(errorMessage);
        return;
      }
    
      const apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/trade`;
      console.log(tradingData.stockQuantity,  selectedOption === '매도' ? 1 : 0, tradingData.adjustedPrice, selectedCompany?.stockCode, formatDateToCustom(selectedDate))
      try {
        const response = await axios.post(apiUrl, {
          cnt: tradingData.stockQuantity,
          optionBuySell: selectedOption === '매도' ? 1 : 0,
          price: tradingData.adjustedPrice,
          stockCode: selectedCompany?.stockCode,
          tradeAt: selectedDate ? formatDateToCustom(selectedDate) : null,

          keywords: [
            "string"
          ],
          reason: "string",
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const tradePk = response.data.tradePk;
        console.log("확인", tradePk)
        navigate(`/writetradingrecord/${tradePk}`);
        setAlertMessage(null);
        return true;
      } catch (error) {
        console.error('Fetch stock price error:', error);
        return false;
      }
    };
    

    const getIncrementValue = () => {
      if (adjustedPrice === null) return 0;
      if (adjustedPrice !== undefined){
        if (adjustedPrice < 5000) return 5;
        if (adjustedPrice >= 5000 && adjustedPrice < 20000) return 10;
        if (adjustedPrice >= 20000 && adjustedPrice < 50000) return 50;
        if (adjustedPrice >= 50000) return 100;
      }

      
  };

  const fetchOwnedCompanies = (page = 0) => {
    axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/trade/corp`, {
      params: {
        page: page,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      const { content, totalPages } = response.data;
      setOwnedCompanies(content);
      setTotalPages(totalPages); 
    })
    .catch((error) => {
      console.error('Fetch owned companies error:', error);
    });
};


    const fetchStockPrice = (stockCode: number, status: string) => {
      let apiUrl = '';
      const formattedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : ''; 
      console.log(selectedDate)
      if (status === '매수') {
        apiUrl = `${import.meta.env.VITE_DATA_API_URL}/corp/price/${stockCode}`; 
        axios.get(apiUrl, {
          params: {
            target_date: formattedDate
          },
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
        .then((response) => {
          const fetchedPrice = response.data.price;
          setStockPrice(fetchedPrice);
          setAdjustedPrice(fetchedPrice);
          // console.log(fetchedPrice);
        })
        .catch((error) => {
          console.error('Fetch stock price error:', error);
        });
      } else if (status === '매도') {
        apiUrl = `${import.meta.env.VITE_BACK_API_URL}/api/corp/price`; 
        axios.get(apiUrl, {
            params: {
                status: status,
            },
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then((response) => {
            const companyData = response.data.find((company: Company) => company.corpName === selectedCompany?.corpName);
            if (companyData) {
                const fetchedPrice = companyData.lastBuyPrice;
                setStockPrice(fetchedPrice);
                setAdjustedPrice(fetchedPrice);
                setNetCount(companyData.netCount)
            } else {
                console.error("Couldn't find matching company data for selected company.");
            }
        })
        .catch((error) => {
            console.error('Fetch stock price error:', error);
        });
    }

      
    };

    // const handleOptionChange = (option: string) => {
    //   if (selectedOption !== option) {
    //     setSelectedOption(option);
    //     setSelectedCompany(null);
    //   }
    // };

    useEffect(() => {
      if (selectedOption === '매도') {
        fetchOwnedCompanies();
      }

      if (selectedDate && selectedOption && selectedCompany) {
        fetchStockPrice(selectedCompany.stockCode, selectedOption);
        // setSelectedCompany(selectedCompany)
      } if (selectedCompany == null) {
        setStockPrice(null);
        setAdjustedPrice(undefined);
        // console.log('test',stockPrice, adjustedPrice);
      };
      
      
    }, [selectedDate, selectedOption, selectedCompany]);


    const handleSearchCompany = useCallback((keyword: string) => {
      if (keyword !== '') {
        axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/corp/search`, {
          params: {
            keyword: keyword,
            page: currentPage - 1,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        .then((response) => {
          // console.log(currentPage)
          const { content, totalPages } = response.data;
          setSearchResults(content);
          setTotalPages(totalPages);
        })
        .catch((error) => {
          console.error('Search error:', error);
        });
      } else {
        // setSearchResults([]);
      }
  }, [currentPage, token]); 

  useEffect(() => {
    if (searchKeyword !== '') {
        handleSearchCompany(searchKeyword);
    } else {
        fetchOwnedCompanies(currentPage - 1);
    }
}, [currentPage]);

  
    
    const adjustPrice = (increment: number) => {
      if (adjustedPrice !== null) {
        const newPrice = adjustedPrice + increment;
        setAdjustedPrice(newPrice);
        }
      };

      const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        console.log('handlepagechange', newPage)
        if (searchKeyword !== '') {
            handleSearchCompany(searchKeyword);
        } else {
            fetchOwnedCompanies(newPage - 1); 
        }
    };
    

    const handleButtonClick = async () => {
      const success = await gotowritetradingrecord();
      if (success) {
          closeWritePage();
      }
    };


    const handleClick = (option: string) => {
      if (selectedOption !== option) {
          setSelectedOption(option);
          setSelectedCompany(null);
          setStockQuantity(0);
          setNetCount(0)
          setAlertMessage(null)
          setForceRender((prev) => prev + 1);
          // console.log(selectedCompany)
      }
  };

    

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setSearchResults([]);      
    setSearchKeyword(''); 
    setIsChoose(true);     
};

const resetChooseState = () => {
  setIsChoose(false);
};

  // console.log(ownedCompanies)
    return (
      <div className={styles.writecontainer}>
    <div className={styles.title}>매매기록 작성</div>
    <div className={styles.card}>
        <div className={styles.horizontal}>
            <div className={styles.leftContainer}>
                <div className={styles.weather}>날짜</div>
                <div className={styles.datepicker}>
                    <DatePicker
                        locale={ko}
                        dateFormat="yyyy.MM.dd"
                        selected={selectedDate}
                        onChange={(date: Date) => setSelectedDate(date)}
                        filterDate={(date: Date) => {
                            return date.getDay() !== 0 && date.getDay() !== 6;
                        }}
                        placeholderText="날짜 선택"
                        maxDate={initialAdjustedDate}
                        disabled={selectedOption === "매도"}
                    />  
                </div>
            </div>
            <div className={styles.rightContainer}>
                <button
                    className={`${selectedOption === '매수' ? styles.bold : styles.normal} ${styles.button}`}
                    onClick={() => handleClick('매수')}
                >
                    매수
                </button>
                <button
                    className={`${selectedOption === '매도' ? styles.bold : styles.normal} ${styles.button}`}
                    onClick={() => handleClick('매도')}
                >
                    매도
                </button>
            </div>
        </div>
    <div className={styles.parentContainer}>
        {selectedOption === '매수' && <SearchingCompany onSearch={handleSearchCompany} resetChoose={resetChooseState} searchResults={searchResults} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} choose={isChoose} handleSelectCompany={handleSelectCompany} handlePageChange= {handlePageChange} totalPages={totalPages} currentPage = {currentPage}/>}
        
        {selectedCompany && selectedOption === '매도' && (
            <div className={styles.corpcontainer}>
                <img src={selectedCompany.logoUrl} alt={selectedCompany.corpName} className={styles.img}/>
                <span>{selectedCompany.corpName}</span>
            </div>
        )}

        {ownedCompanies.length > 0 && selectedOption === '매도' && !selectedCompany && (
            <div className={styles.ownedCompanies}>
                <h2 className={styles.ownedTitle}>보유한 주식</h2>
                {ownedCompanies.map((company) => (
                    <div 
                        key={company.stockCode}
                        className={styles.corpcontainer}
                        onClick={() => handleSelectCompany(company)}
                    >
                        <img src={company.logoUrl} alt={company.corpName} className={styles.img} />
                        <span>{company.corpName}</span>
                    </div>
                ))}
              <div className={styles.paginationContainer}>
                    <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span style={{ fontSize: "var(--font-h2)" }}>{currentPage}</span>
      <button
        className={styles.button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
                </div>
            </div>
        )}

        {selectedOption === '매도' && ownedCompanies.length === 0 && <div>보유주식이 없습니다.</div>}
        
        <div className={styles.inputContainer}>
            <input
                type="number"
                className={styles.quantityinput}
                value={stockQuantity === 0 ? "" : stockQuantity}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                        setStockQuantity(0);
                    } else {
                        setStockQuantity(parseInt(value, 10));
                    }
                }}
            />
            주
        </div>

        <div className={styles.horizontal2}>
            <div className={styles.weather}>평단가</div>
            <div className={styles.priceAdjust}>
                <button className={styles.button2} onClick={() => adjustPrice(-getIncrementValue())}>-</button>
                {finalPrice !== undefined ? `${finalPrice}원` : "0 원"}
                <button className={styles.button2} onClick={() => adjustPrice(getIncrementValue())}>+</button>
            </div>
        </div>
        </div>
        <div className={styles.buttonsContainer}>
            <button onClick={closeWritePage} className={styles.buttoncancel}>취소</button>
            <button onClick={handleButtonClick} className={styles.buttonadd}>추가</button>
        </div>

        {alertMessage && <p>{alertMessage}</p>}
    </div>
</div>

    );
  };

  export default WriteTradingRecord;