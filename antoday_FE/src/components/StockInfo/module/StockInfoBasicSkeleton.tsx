import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./StockInfoBasicSkeleton.module.css";

const StockInfoBasicSkeleton: React.FC = () => {
	return (
		<div className={styles.skeletonContainer}>
      <div className={styles.divBox}>
        <Skeleton width="6rem" height={13} />
        <Skeleton circle width="1rem" height="1rem" />
      </div>
			<Skeleton width="4rem" height={16} />
			<Skeleton width="12rem" height={16} />
			<Skeleton width="10rem" height={13} />
			<Skeleton width="4rem" height={13} />
		</div>
	);
};

export default StockInfoBasicSkeleton;