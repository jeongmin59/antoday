import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SearchSkeleton.module.css";

const SearchSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={styles.cardSkeleton2}>
              <Skeleton circle width="1.5rem" height="1.5rem" className={styles.logo} />
              <Skeleton className={styles.corpName} />
            </div>
              <Skeleton className={styles.like} />
          </div>
        ))}
    </div>
  );
};

export default SearchSkeleton;
