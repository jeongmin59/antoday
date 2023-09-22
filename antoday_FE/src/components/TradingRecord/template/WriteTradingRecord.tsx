import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './WriteTradingRecord.module.css';
import SearchingCompany from './SearchingCompany';
import axios from 'axios';
import { accessTokenAtom } from '../../../recoil/auth';
import { useRecoilState } from 'recoil';


interface WriteTradingRecordPageProps {
  closeWritePage: () => void;
}

interface Company {
  stockCode: number;
  corpName: string;
  logoUrl: string;
}

const WriteTradingRecordPage: React.FC<WriteTradingRecordPageProps> = ({ closeWritePage }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [adjustedPrice, setAdjustedPrice] = useState<number | null>(null);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [ownedCompanies, setOwnedCompanies] = useState<Company[]>([]);
  const [token,setToken] = useRecoilState(accessTokenAtom);
  const [forceRender, setForceRender] = useState(0);


  const tradingData = {
    selectedDate,
    selectedCompany,
    selectedOption,
    adjustedPrice,
    stockQuantity,
  };

  const gotowritetradingrecord = () => {
    navigate('/writetradingrecord/:recordPk', { state: { 
      tradingdata: tradingData,
     } });
  };

  const getIncrementValue = () => {
    if (adjustedPrice === null) return 0;

    if (adjustedPrice < 5000) return 5;
    if (adjustedPrice >= 5000 && adjustedPrice < 20000) return 10;
    if (adjustedPrice >= 20000 && adjustedPrice < 50000) return 50;
    if (adjustedPrice >= 50000) return 100;
};

  const fetchOwnedCompanies = () => {
    axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/trade/corp`)
    .then((response) => {
      setOwnedCompanies(response.data);
      // console.log(ownedCompanies)
    })
    .catch((error) => {
      console.error('Fetch owned companies error:', error);
    });
  };

  const fetchStockPrice = (stockCode: number, status: string) => {
    let apiUrl = '';
    const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

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
        console.log(fetchedPrice);
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
        const fetchedPrice = response.data.price;
        setStockPrice(fetchedPrice);
        setAdjustedPrice(fetchedPrice);
        console.log(fetchedPrice);
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
    }
  }, [selectedDate, selectedOption, selectedCompany]);

  const handleSearchCompany = (keyword: string) => {
    setSearchKeyword(keyword);
    setSelectedCompany(null);
    axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/corp/search`, {
      params: {
        keyword: keyword,
        page: currentPage - 1,
      },
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    .then((response) => {
      const { content, totalPages } = response.data;
      setSearchResults(content);
      console.log(response.data)
      setTotalPages(totalPages);
    })
    .catch((error) => {
      console.error('Search error:', error);
    });
  };

  const adjustPrice = (increment: number) => {
    if (adjustedPrice !== null) {
      const newPrice = adjustedPrice + increment;
      setAdjustedPrice(newPrice);
      }
    };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handleSearchCompany(searchKeyword);
  };

  const handleButtonClick = () => {
    closeWritePage();
    gotowritetradingrecord();
  };

  const handleClick = (option: string) => {
    if (selectedOption !== option) {
        setSelectedOption(option);
        setSelectedCompany(null);
        setForceRender((prev) => prev + 1);
    }
};

  

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div>
      <div className={styles.horizontal}>
        <p>날짜</p>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedDate(date);
            }
          }}
          filterDate={(date: Date) => {
            return date.getDay() !== 0 && date.getDay() !== 6;
          }}
        />
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
  
      <div>
        {ownedCompanies.length > 0 && !selectedCompany ? (
          <div>
            <h2>보유한 주식</h2>
            {ownedCompanies.map((company) => (
              <div 
                key={company.stockCode} 
                className={styles.corpcontainer}
                onClick={() => handleSelectCompany(company)}
              >
                <img src={company.logoUrl} alt={company.corpName} />
                <span>{company.corpName}</span>
              </div>
            ))}
          </div>
        ) : !selectedCompany ? (
          <div>
            <SearchingCompany onSearch={handleSearchCompany} />
            <div className={styles.searchresults}>
              {searchResults.map((result) => (
                <div
                  key={result.stockCode}
                  className={styles.corpcontainer}
                  onClick={() => handleSelectCompany(result)}
                >
                  <img src={result.logoUrl} alt={result.corpName} />
                  <span>{result.corpName}</span>
                </div>
              ))}
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div key={selectedCompany.stockCode} className={styles.corpcontainer}>
            <img src={selectedCompany.logoUrl} alt={selectedCompany.corpName} />
            <span>{selectedCompany.corpName}</span>
          </div>
        )}
  
        <div>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />
          주
        </div>
        <div className={styles.horizontal}>
          <div>평단가</div>
          <div>
            <button onClick={() => adjustPrice(-getIncrementValue())}>-</button>
            {adjustedPrice !== null ? `${adjustedPrice}원` : "0 원"}
            <button onClick={() => adjustPrice(getIncrementValue())}>+</button>
          </div>
        </div>
        <button onClick={closeWritePage}>취소</button>
        <button onClick={handleButtonClick}>추가</button>
      </div>
    </div>
  );
};

export default WriteTradingRecordPage;
