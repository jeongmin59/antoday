import React, { useState, useEffect } from 'react';
import styles from './SearchingCompany.module.css';
import useDebounce from '../../../utils/useDebounce';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
  onSearch: (keyword: string) => void;
  resetChoose: () => void;
  searchResults: any[];
  selectedCompany: Company | null;
  choose: boolean;
  handleSelectCompany: (company: Company) => void;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  setSelectedCompany: (company: Company | null) => void;
  currentPage: number;
  setIsEVisible: any;
  setStockQuantity: any;
  stockQuantity: number;
}

interface Company {
  stockCode: number;
  corpName: string;
  logoUrl: string;
}

const SearchingCompany: React.FC<SearchInputProps> = ({
  stockQuantity,
  setStockQuantity,
  setIsEVisible,
  onSearch,
  resetChoose,
  searchResults,
  selectedCompany,
  choose,
  handleSelectCompany,
  totalPages,
  handlePageChange,
  setSelectedCompany,
  currentPage,
}) => {
  const [keyword, setKeyword] = useState('');
  const [shouldClearOnNextFocus, setShouldClearOnNextFocus] = useState(false);
  const [localSearchResults, setLocalSearchResults] = useState<any[]>([]);
  const [nowPage, setNowPage] = useState<number>(0);

  const handleSearch = () => {
    onSearch(keyword);
    setShouldClearOnNextFocus(true);
  };

  const clickArrow = (page) => {
    handlePageChange(page);
    setNowPage(page);
  };

  const handleInputFocus = () => {
    if (shouldClearOnNextFocus) {
      setKeyword('');
      setShouldClearOnNextFocus(false);
    }
  };

  const debouncedInputValue = useDebounce({
    value: keyword,
    delay: 200, // 디바운스 딜레이 설정 (예: 300ms)
  });

  useEffect(() => {
    onSearch(debouncedInputValue);
  }, [debouncedInputValue, onSearch]);

  useEffect(() => {
    if (localSearchResults.length > 0 && !choose) {
      setIsEVisible(false);
    } else {
      setIsEVisible(true);
    }
  }, [localSearchResults, choose]);

  useEffect(() => {
    if (keyword === '') {
      setLocalSearchResults([]);
      setSelectedCompany(null);
    } else {
      setLocalSearchResults(searchResults);
    }
  }, [keyword, searchResults]);

  const handleSubmit = async (event: React.FormEvent) => {
    // 기본 제출 동작 방지
    event.preventDefault();
    // if (keyword) {
    //   setIsSubmit(true);
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <form onSubmit={handleSubmit} className={`${styles.searchBarContainer} `}>
          <input
            type="text"
            placeholder="종목명 검색"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              resetChoose();
            }}
            onFocus={handleInputFocus}
            className={
              `${styles.inputBox} `
          }
          
          />
          <button onClick={handleSearch} className={styles.searchButton}>search</button>
        </form>
      </div>

      <div className={styles.problem}>
        {(localSearchResults.length > 0 && !choose) ? (
          // searchResults가 있을 때
          <div>
            <div className={styles.searchresults}>
              {searchResults.map((result) => (
                <div
                  key={result.stockCode}
                  className={styles.corpcontainer}
                  onClick={() => handleSelectCompany(result)}
                >
                  <img src={result.logoUrl} alt={result.corpName} className={styles.img} />
                  <span>{result.corpName}</span>
                </div>
              ))}
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => clickArrow(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span style={{ fontSize: "var(--font-h2)" }}>{currentPage}</span>
              <button
                className={styles.button}
                onClick={() => clickArrow(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        ) : (
            // searchResults가 없을 때
            (selectedCompany && choose) ? (
              <div key={selectedCompany?.stockCode} className={styles.corpcontainer}>
                <img src={selectedCompany?.logoUrl} alt={selectedCompany?.corpName} className={styles.img} />
                <span>{selectedCompany?.corpName}</span>
              </div>
            ) : null
          )}
      </div>
      <div className={styles.horizontal2}>
      <div className={styles.weather}>매수 개수</div>
        <div className={`${styles.inputContainer} ${
          localSearchResults.length > 0 && !choose
          ? styles.inputBelow
          : styles.inputBeside
        }`}>
          <input
            type="number"
            className={`${styles.quantityinput} `}
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
            </div>
    </div>
  );
};

export default SearchingCompany;
