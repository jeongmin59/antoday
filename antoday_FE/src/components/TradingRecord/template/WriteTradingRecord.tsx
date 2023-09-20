import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './WriteTradingRecord.module.css';
import SearchingCompany from './SearchingCompany';
import axios from 'axios';  

interface WriteTradingRecordPageProps {
    closeWritePage: () => void;
  }

  interface Company {
    stockCode: string;
    corpCode: string;
    corpName: string;
    logoUrl: string;
    isLiked: boolean | null;
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

    const someData = "I am some data from B";

    const gotowritetradingrecord = () => {
        navigate('/writetradingrecord', { state: { tradingdata: someData } });
      };
    
      const handleSearchCompany = (keyword: string) => {
        setSearchKeyword(keyword); 
        setSelectedCompany(null);
        axios.get(`${import.meta.env.VITE_BACK_API_URL}/api/corp/search`, {
          params: {
            keyword: keyword,
            page: currentPage - 1, 
          },
        })
        .then((response) => {
          console.log(response)
          const { content, totalPages } = response.data;
          setSearchResults(content);
          setTotalPages(totalPages);
        })
        .catch((error) => {
          console.error('Search error:', error);
        });
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
        setSelectedOption(option);
      };

      const handleSelectCompany = (company : Company) => {
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
          <SearchingCompany onSearch={handleSearchCompany} />
          <div className={styles.searchresults}>
            {selectedCompany ? (
              <div key={selectedCompany.stockCode} className={styles.corpcontainer}>
                <img src={selectedCompany.logoUrl} alt={selectedCompany.corpName} />
                <span>{selectedCompany.corpName}</span>
              </div>
            ) : (
              searchResults.length > 0 && (
                <div className={styles.resultcontainer}>
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
              )
            )}
            
            <div><input />주</div>
          </div>
          <div className={styles.horizontal}>
            <div>평단가</div>
            <div>70100원</div>
          </div>
        </div>
        <button onClick={closeWritePage}>취소</button>
        <button onClick={handleButtonClick}>추가</button>
      </div>
    );
};

export default WriteTradingRecordPage;