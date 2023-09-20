import React, { useState, ChangeEvent } from 'react';
import styles from './CheckTradingRecord.module.css';

interface KeywordInputProps {}

const KeywordInput: React.FC<KeywordInputProps> = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleTagButtonClick = () => {
    if (keyword) {
      setTags([...tags, `#${keyword}`]);
      setKeyword('');
    }
  };

  return (
    <React.Fragment>
      <div className={styles.pageTitle}>매수/매도 키워드</div>
      <div>
        {tags.map((tag, index) => (
          <span key={index}>{tag}&nbsp;</span>
        ))}
      </div>
      <input
        type="text"
        className={styles.recordContainer}
        value={keyword}
        onChange={handleInputChange}
      />
      <button onClick={handleTagButtonClick}>확인</button>
    </React.Fragment>
  );
};

export default KeywordInput;
