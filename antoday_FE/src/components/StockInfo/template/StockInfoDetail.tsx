import React, { useRef, useState } from "react";
import styles from "./StockInfoDetail.module.css";
import StockChart from "../module/StockChart";
import CompanyOverview from "../module/CompanyOverview";
import StockInformation from "../module/StockInformation";
import RevenueAndProfit from "../module/RevenueAndProfit";
import StockWordCloud from "../module/StockWordCloud";

interface StockInfoDetailProps {
  stockPk? : string;
}

const StockInfoDetail: React.FC<StockInfoDetailProps> = ({stockPk}) => {
  const tab1Ref = useRef<HTMLDivElement>(null);
  const tab2Ref = useRef<HTMLDivElement>(null);
  const tab3Ref = useRef<HTMLDivElement>(null);
  const tab4Ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(1); // 선택된 탭 찾을때 쓸 예정

  const handleTabClick = (tabNumber: number) => {
    let targetRef;

    switch (tabNumber) {
      case 1:
        targetRef = tab1Ref;
        break;
      case 2:
        targetRef = tab2Ref;
        break;
      case 3:
        targetRef = tab3Ref;
        break;
      case 4:
        targetRef = tab4Ref;
        break;
      default:
        break;
    }

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
      setActiveTab(tabNumber); // 클릭한 탭을 활성화
    }
  };

  return (
    <div className={styles.DetailContainer}>
      <div className={styles.tabContainer}>
        <span
          className={`${styles.tab} ${activeTab === 1 ? styles.activeTab : ""}`}
          onClick={() => handleTabClick(1)}
        >
          차트
        </span>
        <span
          className={`${styles.tab} ${activeTab === 2 ? styles.activeTab : ""}`}
          onClick={() => handleTabClick(2)}
        >
          기업개요
        </span>
        <span
          className={`${styles.tab} ${activeTab === 3 ? styles.activeTab : ""}`}
          onClick={() => handleTabClick(3)}
        >
          매출액 및 영업이익
        </span>
        <span
          className={`${styles.tab} ${activeTab === 4 ? styles.activeTab : ""}`}
          onClick={() => handleTabClick(4)}
        >
          기업키워드
        </span>
      </div>
      <hr />
      <div ref={tab1Ref}>
        <StockChart stockPk={stockPk} />
      </div>
      <hr />
      <div ref={tab2Ref}>
        <CompanyOverview />
      </div>
      <hr />
      <StockInformation />
      <hr />
      <div ref={tab3Ref}>
        <RevenueAndProfit />
      </div>
      <hr />
      <div ref={tab4Ref}>
        <StockWordCloud />
      </div>
    </div>
  );
};

export default StockInfoDetail;
