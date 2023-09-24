import React, { useState } from 'react';
import styles from './SearchingCompany.module.css';


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