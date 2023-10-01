import { useState, useEffect,ChangeEvent, FormEvent } from "react";
import styles from "./EditingReasonKeyword.module.css";
import EditingSubmitButton from "../atom/EditingSubmitButton";

interface EditingReasonKeywordProps {
  editedTradeAt?: Date;
  editedCorpName?: string;
  editedOptionBuySell?: string;
  editedPrice?: number;
  editedCnt?: number;
  keywordList?: string[];
  reason?: string;
}

const EditingReasonKeyword: React.FC<EditingReasonKeywordProps> = ({
  editedTradeAt,
  editedCorpName,
  editedOptionBuySell,
  editedPrice,
  editedCnt,
  keywordList,
  reason,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>(keywordList);
  const [tags, setTags] = useState<string[]>([]);
  const [editedReason, setEditedReason] = useState<string>(reason);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleTagButtonClick = (event: FormEvent) => {
    event.preventDefault();

    if (keyword) {
      setTags([...tags, `#${keyword}`]);
      setKeyword("");
      setKeywords([...keywords, keyword]);
    }
  };

  const handleTagClick = (clickedTag: string) => {
    const clickedKeyword = clickedTag.substring(1);

    const updatedTags = tags.filter((tag) => tag !== clickedTag);
    setTags(updatedTags);

    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== clickedKeyword
    );
    setKeywords(updatedKeywords);
  };

  const handleReason = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedReason(event.target.value);
  };

  useEffect(() => {
    const updatedTags = keywordList.map((keyword) => `#${keyword}`);
    setTags(updatedTags);
  }, [keywordList]);

  console.log('qhwk',editedReason);

  return (
    <div>
      <div className={styles.pageTitle}>매수/매도 키워드</div>
      <div>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={styles.keyword}
            onClick={() => handleTagClick(tag)}
          >
            {tag}&nbsp;
          </span>
        ))}
      </div>
      <form className={styles.keywordContainer} onSubmit={handleTagButtonClick}>
        <input
          type="text"
          // className={styles.KeywordInput}
          value={keyword}
          onChange={handleInputChange}
          className={styles.inputBox}
        />
        <input type="submit" value="등록" className={styles.confirmButton} />
      </form>
      <div>
        <div className={styles.pageTitle}>매수/매도 이유</div>
        <textarea
          className={styles.textArea}
          value={editedReason}
          onChange={handleReason}
        />
      </div>
      <EditingSubmitButton
      editedTradeAt={editedTradeAt}
      editedCorpName={editedCorpName}
      editedOptionBuySell={editedOptionBuySell}
      editedPrice={editedPrice}
      editedCnt={editedCnt}
      keywords={keywords}
      editedReason={editedReason}
      />
    </div>
  );
};

export default EditingReasonKeyword;
