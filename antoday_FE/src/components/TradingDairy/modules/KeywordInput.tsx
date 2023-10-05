import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "../modules/KeywordInput.module.css";
import ReasonInput from "./ReasonInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const KeywordInput: React.FC<TradingRecord> = ({
  tradeAt,
  stockCode,
  logoUrl,
  optionBuySell,
  price,
  cnt,
  tradePk,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleTagClick = (clickedTag: string) => {
    const clickedKeyword = clickedTag.substring(1);

    const updatedTags = tags.filter((tag) => tag !== clickedTag);
    setTags(updatedTags);

    const updatedKeywords = keywordList.filter(
      (keyword) => keyword !== clickedKeyword
    );
    setKeywordList(updatedKeywords);
  };

  const handleTagButtonClick = (event: FormEvent) => {
    event.preventDefault();

    if (keyword) {
      setTags([...tags, `${keyword}`]);
      setKeyword("");
      setKeywordList([...keywordList, keyword]);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageTitle}>매수/매도 키워드</div>
      <div className={styles.horizontal2}>
        {tags.map((tag, index) => (
          <div className={styles.horizontal}>
          <div key={index} className={styles.keyword} >
            <div style={{ marginTop: '0.19rem' }}>#</div>
            {tag}&nbsp;
          </div>
          <FontAwesomeIcon
              icon={faCircleXmark}
              size="sm"
              color="var(--main-blue-color)"
              onClick={() => handleTagClick(tag)}
            />
          </div>
        ))}
      </div>
      <form className={styles.keywordContainer} onSubmit={handleTagButtonClick}>
        <input
          type="text"
          // className={styles.KeywordInput}
          value={keyword}
          onChange={handleInputChange}
          className={styles.inputBox}
          placeholder="키워드를 입력해주세요."
        />
        <input type="submit" value="등록" className={styles.confirmButton} />
      </form>
      <ReasonInput
        tradeAt={tradeAt}
        stockCode={stockCode}
        logoUrl={logoUrl}
        optionBuySell={optionBuySell}
        price={price}
        cnt={cnt}
        keywordList={keywordList}
        tradePk={tradePk}
      />
    </div>
  );
};

export default KeywordInput;
