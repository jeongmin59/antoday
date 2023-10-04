import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TodayNewsSkeleton.module.css";

const TodayNewsSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={styles.contentWrapper}>
              <Skeleton className={styles.title} />
              <div className={`${styles.cardSkeleton} ${styles.cardSkeleton2}`}>
                <Skeleton className={styles.company} />
                <Skeleton className={styles.date} />
              </div>
            </div>
            <Skeleton className={styles.picture} />
          </div>
        ))}
    </div>
  );
};

export default TodayNewsSkeleton;
