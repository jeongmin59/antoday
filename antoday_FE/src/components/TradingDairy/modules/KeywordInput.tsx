import React, { useState, ChangeEvent } from 'react';
import styles from '../modules/KeywordInput.module.css';

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
      <div className={styles.keywordContainer}>
      <input
        type="text"
        // className={styles.KeywordInput}
        value={keyword}
        onChange={handleInputChange}
        style={{border: 'none', 
          height: '70%', 
          width: '75%'}}
      />
      <button 
        className={styles.confirmButton}
        onClick={handleTagButtonClick}>확인</button>
      </div>
    </React.Fragment>
  );
};

export default KeywordInput;
