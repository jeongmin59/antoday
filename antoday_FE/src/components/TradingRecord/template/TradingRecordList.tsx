import React, { useState } from "react";
import { TradingRecordPageType } from "../../../pages/TradePage/TradingRecordPage";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../../Common/atom/LoadingSpinner";
import styles from "./TradingRecordList.module.css";
import { useNavigate } from "react-router-dom";

interface TradingRecordListProps {
  records?: TradingRecordPageType[];
  hasMore: boolean;
  fetchMoreData: any;
  lastRecordRef: (node?: Element | null | undefined) => void;
}

const TradingRecordList: React.FC<TradingRecordListProps> = ({
  records = [],
  hasMore,
  fetchMoreData,
  lastRecordRef
}) => {
  const navigator = useNavigate();
  const [reasonExist, setReasonExist] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const groupedRecords: { [date: string]: TradingRecordPageType[] } = {};

  // const loadMore = async () => {
  //   try {
  //     // fetchMoreData 호출 수정
  //     await fetchMoreData();
  //   } catch (error) {
  //     console.error("Failed to load more data:", error);
  //   }
  // };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  records.forEach((record) => {
    const dateOnly = formatDate(record.tradeAt);
    if (!groupedRecords[dateOnly]) {
      groupedRecords[dateOnly] = [];
    }
    groupedRecords[dateOnly].push(record);
  });

  const handleClick = (reasonExist: boolean, tradePk: number) => {
    if (reasonExist == true) {
      setReasonExist(true);
      navigator(`/tradingrecord/${tradePk}`);
    } else {
      setReasonExist(false);
      navigator(`/writetradingrecord/${tradePk}`);
    }
  };

  return (
    <div className={styles.div}>
      {Object.entries(groupedRecords).map(([date, dateRecords], groupIndex) => {
        const isLastDateGroup = groupIndex === Object.entries(groupedRecords).length - 1;

        return (
          <div key={date} className={styles.container}>
            <div className={styles.dateHeader}>{date}</div>
            {dateRecords.map((record, index) => {
              const isLastRecordInGroup = index === dateRecords.length - 1;

              return (
                <div
                  key={index}
                  onClick={() => handleClick(record.reasonExist, record.tradePk)}
                >
                  <div className={styles.listItem}>
                    <div className={styles.row}>
                      <img src={record.logoUrl} alt="" />
                      <div className={styles.corpnameoption}>
                        <span>{record.corpName}</span>
                        {record.optionBuySell ? (
                          <span className={styles.optionSell}>매도</span>
                        ) : (
                          <span className={styles.optionBuy}>매수</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.pricecount}>
                        <span>{record.price?.toLocaleString()}원</span>
                        <span ref={(isLastDateGroup && isLastRecordInGroup) ? lastRecordRef : null}>
                          {record.cnt}주
                        </span>
                      </div>
                      {record.reasonExist ? (
                        <button className={`${styles.btn} ${styles.button1}`}>일지 조회</button>
                      ) : (
                        <button className={`${styles.btn} ${styles.button2}`}>일지 작성</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {records?.length === 0 && <h2>검색 결과가 없습니다.</h2>}
    </div>
  );
};

export default TradingRecordList;
