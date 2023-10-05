import React from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton"; // SkeletonProps 추가
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./StockInfoDetailSkeleton.module.css";

interface CustomSkeletonProps extends SkeletonProps {
	spacing?: string;
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
	spacing,
	...rest
}) => {
	const skeletonStyle: React.CSSProperties = {
		marginBottom: spacing,
	};

	return (
		<div style={skeletonStyle}>
			<Skeleton {...rest} />
		</div>
	);
};

const StockInfoDetailSkeleton: React.FC = () => {
	return (
		<div className={styles.skeletonContainer}>
			<Skeleton width="16rem" />
			<div className={styles.contentContainer}>
					<Skeleton height="330px" />

				<div className={styles.content}>
          <Skeleton width="5rem" />
					{Array.from({ length: 10 }).map((_, index) => (
						<CustomSkeleton
							key={index}
							width="10rem"
							spacing="0.7rem"
						/>
					))}
				</div>
				<Skeleton height="300px" />
				<Skeleton height="300px" />
			</div>
		</div>
	);
};

export default StockInfoDetailSkeleton;
