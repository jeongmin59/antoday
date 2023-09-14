// TradingRecordList.tsx

import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TradingRecordPageType } from '../../../pages/TradingRecordPage'; 

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
        loader={records.length > 0 ? <p>Loading...</p> : null}
      >
        {records.map((record) => (
          <div key={record.tradePk}>
            <p>Trade PK: {record.tradePk}</p>
            <p>Price: {record.price}</p>
            <p>Count: {record.cnt}</p>
            <p>Option Buy/Sell: {record.optionBuySell ? 'Buy' : 'Sell'}</p>
            <p>Trade At: {record.tradeAt}</p>
            <p>Stock Code: {record.stockCode}</p>
            <p>Corp Name: {record.corpName}</p>
          </div>
        ))}
      </InfiniteScroll>
      {records.length === 0 && <h2>No trading records found</h2>}
    </div>
  );
};

export default TradingRecordList;
