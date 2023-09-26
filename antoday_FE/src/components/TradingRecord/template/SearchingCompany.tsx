import React, { useState, useEffect } from 'react';
import styles from './SearchingCompany.module.css';
import useDebounce from '../../../utils/useDebounce';


interface SearchInputProps {
    onSearch: (keyword: string) => void; 
    resetChoose: () => void;
    searchResults: any[];
    selectedCompany: Company | null;
    choose: boolean;
    handleSelectCompany: (company: Company) => void;
    totalPages: number;
    handlePageChange: (newPage: number)=>void;
    setSelectedCompany: (company : Company|null)=>void;
    
}

interface Company {
    stockCode: number;
    corpName: string;
    logoUrl: string;
  }

const SearchingCompany: React.FC<SearchInputProps> = ({ onSearch, resetChoose, searchResults, selectedCompany, choose, handleSelectCompany, totalPages, handlePageChange, setSelectedCompany }) => {
    const [keyword, setKeyword] = useState('');
    const [shouldClearOnNextFocus, setShouldClearOnNextFocus] = useState(false); 
    const [localSearchResults, setLocalSearchResults] = useState<any[]>([]);

    const handleSearch = () => {
        onSearch(keyword);
        setShouldClearOnNextFocus(true);
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
        if (keyword === '') {
            setLocalSearchResults([]);
            setSelectedCompany(null);
        } else {
            setLocalSearchResults(searchResults);
        }
    }, [keyword, searchResults]);
    
    

    return (
        <div>
        <div className={styles.div}>
            <input
                type="text"
                placeholder="종목명 검색"
                value={keyword}
                onChange={(e) => {setKeyword(e.target.value);
                    resetChoose();}}
                onFocus={handleInputFocus}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
        
    <div>
      
      {(localSearchResults.length > 0 && !choose) ? (
        // searchResults가 있을 때
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
      ) : (
        // searchResults가 없을 때
        (selectedCompany && choose)  ? (
          <div key={selectedCompany?.stockCode} className={styles.corpcontainer}>
            <img src={selectedCompany?.logoUrl} alt={selectedCompany?.corpName} />
            <span>{selectedCompany?.corpName}</span>
          </div>
        ) : null
      )}
    </div>
        </div>
    );
};

export default SearchingCompany;