import React, { useState, useEffect } from 'react';
import styles from './SearchingCompany.module.css';
import useDebounce from '../../../utils/useDebounce';


interface SearchInputProps {
    onSearch: (keyword: string) => void; 
}

const SearchingCompany: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [shouldClearOnNextFocus, setShouldClearOnNextFocus] = useState(false); 
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
    

    return (
        <div className={styles.div}>
            <input
                type="text"
                placeholder="종목명 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={handleInputFocus}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default SearchingCompany;