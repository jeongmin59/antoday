import React, {useState} from "react";
import { TradingRecordPageType } from "../../../pages/TradePage/TradingRecordPage";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../../Common/atom/LoadingSpinner";
import styles from "./TradingRecordList.module.css";
import { useNavigate } from "react-router-dom";

interface TradingRecordListProps {
  records?: TradingRecordPageType[];
  hasMore: boolean;
  fetchMoreData: () => void;
}

const TradingRecordList: React.FC<TradingRecordListProps> = ({
  records = [],
  hasMore,
  fetchMoreData,
}) => {
  const navigator = useNavigate();
  const [reasonExist, setReasonExist] = useState<Boolean>(false)

  const handleClick = (reasonExist: boolean, tradePk: number) => {
    
    if (reasonExist == true) {
      setReasonExist(true)
      navigator(`/tradingrecord/${tradePk}`);
    } else {
      setReasonExist(false)
      navigator(`/writetradingrecord/${tradePk}`);
    }
  };

  return (
    <div className={styles.div}>
      <InfiniteScroll
        dataLength={records?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={records?.length > 0 ? <LoadingSpinner /> : null}
      >
        {records?.map((record, index) => {
          console.log(index, record.logoUrl);
          const dateOnly = record.tradeAt.split("T")[0];

          return (
            <div
              key={index}
              className={styles.container}
              onClick={() => handleClick(record.reasonExist, record.tradePk)}
            >
              <div><p>{dateOnly}</p></div>  
              <div className={styles.smallcontainer}>
                <img src={record.logoUrl} alt="" />
                <div className={styles.corpnameoption}>
                  <p>{record.corpName}</p>
                  <p>{record.optionBuySell ? "매수" : "매도"}</p>
                </div>
                <div className={styles.pricecount}>
                  <p>{record.price}원</p>
                  <p>{record.cnt}주</p>
                </div>
                {record.reasonExist ? <button className={styles.button1}>매매일지 조회</button> : <button className={styles.button2}>매매일지 작성</button>}
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
      {records?.length === 0 && <h2>검색 결과가 없습니다.</h2>}
    </div>
  );
};

export default TradingRecordList;
