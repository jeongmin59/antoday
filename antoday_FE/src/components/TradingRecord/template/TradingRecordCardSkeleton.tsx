import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TradingRecordCardSkeleton.module.css";

interface TradingRecordCardSkeletonProps {
  cards: number;
}

const TradingRecordCardSkeleton: React.FC<TradingRecordCardSkeletonProps> = ({
  cards,
}) => {
  return (
    <div className={styles.skeletonContainer}>
      <Skeleton className={styles.dateSkeleton} />
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <Skeleton circle width="2rem" height="2rem" />
            <div className={styles.contentWrapper}>
              <Skeleton className={styles.content} />
              <Skeleton className={styles.content} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default TradingRecordCardSkeleton;
