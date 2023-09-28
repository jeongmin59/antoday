import React, { useState } from "react";
import {
  TradingRecordPageType,
  StockRoiType,
} from "../../../pages/TradePage/TradingRecordPage";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../../Common/atom/LoadingSpinner";
import styles from "./TradingRecordList.module.css";
import { useNavigate } from "react-router-dom";
import StockProfit from "./StockProfit.tsx";

interface TradingRecordListProps {
  records?: TradingRecordPageType[];
  roiList?: StockRoiType[];
  hasMore: boolean;
  fetchMoreData: any;
  lastRecordRef: (node?: Element | null | undefined) => void;
}

const TradingRecordList: React.FC<TradingRecordListProps> = ({
  records = [],
  roiList = [],
  hasMore,
  fetchMoreData,
  lastRecordRef,
}) => {
  const navigator = useNavigate();
  const [reasonExist, setReasonExist] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStock, setSelectedStock] = useState<StockRoiType | null>(null);
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

  const handleDetail = (reasonExist: boolean, tradePk: number) => {
    if (reasonExist == true) {
      setReasonExist(true);
      navigator(`/tradingrecord/${tradePk}`);
    } else {
      setReasonExist(false);
      navigator(`/writetradingrecord/${tradePk}`);
    }
  };

  const handleStock = (e: React.MouseEvent, record: TradingRecordPageType) => {
    console.log("url clicked!");
    e.stopPropagation();
    setSelectedStock(findStockRoi(record.stockCode));
  };

  const findStockRoi = (stockCode: string) => {
    for (const listitem of roiList) {
      if (listitem.stockCode == stockCode) {
        console.log("find!!!!!", listitem);
        return listitem;
      }
    }
    console.log("can not find");
    return null;
  };

  const setStockClose = () => {
    setSelectedStock(null);
  };

  return (
    <div className={styles.div}>
      {Object.entries(groupedRecords).map(([date, dateRecords], groupIndex) => {
        const isLastDateGroup =
          groupIndex === Object.entries(groupedRecords).length - 1;

        return (
          <div key={date} className={styles.container}>
            <div className={styles.dateHeader}>{date}</div>
            {dateRecords.map((record, index) => {
              const isLastRecordInGroup = index === dateRecords.length - 1;

              return (
                <div
                  key={index}
                  onClick={() =>
                    handleDetail(record.reasonExist, record.tradePk)
                  }
                >
                  <div className={styles.listItem}>
                    <div className={styles.row}>
                      <img
                        src={record.logoUrl ? record.logoUrl : undefined}
                        alt=""
                        onClick={(event) => handleStock(event, record)}
                      />
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
                        <span
                          ref={
                            isLastDateGroup && isLastRecordInGroup
                              ? lastRecordRef
                              : null
                          }
                        >
                          {record.cnt}주
                        </span>
                      </div>
                      {record.reasonExist ? (
                        <button className={`${styles.btn} ${styles.button1}`}>
                          {" "}
                        </button>
                      ) : (
                        <button className={`${styles.btn} ${styles.button2}`}>
                          {" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {selectedStock != null ? (
        <StockProfit info={selectedStock} onClose={setStockClose} />
      ) : null}
      {records?.length === 0 && <h2>검색 결과가 없습니다.</h2>}
    </div>
  );
};

export default TradingRecordList;
