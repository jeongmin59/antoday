import React, { useState } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
    onSearch: (keyword: string) => void; 
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        onSearch(keyword);
    };

    return (
        <div className={styles.div}>
            <input
                type="text"
                placeholder="키워드, 종목명 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default SearchInput;
