import Skeleton from "react-loading-skeleton";
import styles from "./StockInfoBasicSkeleton.module.css";

export const StockInfoBasicSkeleton: React.FC = () => {
	return (
		<div className={styles.skeletonContainer}>
			<div>
				<Skeleton
					width="6rem"
					height={13}
				/>
				<Skeleton
					width="6rem"
					height={13}
				/>
			</div>
			<Skeleton
				width="4rem"
				height={16}
			/>
			<Skeleton
				width="12rem"
				height={16}
			/>
			<Skeleton
				width="10rem"
				height={13}
			/>
		</div>
	);
};
