import React from 'react';
import { TradingRecordPageType } from '../../../pages/TradingRecordPage'; 
import InfiniteScroll from 'react-infinite-scroll-component'; 
import LoadingSpinner from '../../Common/atoms/LoadingSpinner';
import styles from './TradingRecordList.module.css';

interface TradingRecordListProps {
  records: TradingRecordPageType[];
  hasMore: boolean;
  fetchMoreData: () => void;
}

const TradingRecordList: React.FC<TradingRecordListProps> = ({ records, hasMore, fetchMoreData }) => {
  return (
    <div>
      <InfiniteScroll
        dataLength={records.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={records.length > 0 ? <LoadingSpinner /> : null}
      >
        {records.map((record) => (
          <div key={record.tradePk} className={styles.container}>
            <p>Trade At: {record.tradeAt}</p>
            <p>Corp Name: {record.corpName}</p>
            <p>Option Buy/Sell: {record.optionBuySell ? 'Buy' : 'Sell'}</p>
            <p>Price: {record.price}</p>
            <p>Count: {record.cnt}</p>
            <p>Stock Code: {record.stockCode}</p>
            <hr />
          </div>
          
        ))}
      </InfiniteScroll>
      {records.length === 0 && <h2>검색 결과가 없습니다.</h2>}
    </div>
  );
};

export default TradingRecordList;
