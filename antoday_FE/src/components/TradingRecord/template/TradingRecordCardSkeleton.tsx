import  Skeleton  from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './TradingRecordCardSkeleton.module.css';

interface TradingRecordCardSkeletonProps {
    cards: number
}

const TradingRecordCardSkeleton: React.FC<TradingRecordCardSkeletonProps> = ({
    cards
}) => {
    return (
        <div className={styles.skeletonContainer}>
            {Array(cards)
                .fill(0)
                .map((item, i) => (
                    <div key={i} className={styles.cardSkeleton}>
                        <Skeleton circle width="2rem" height="2rem" />
                        <Skeleton count={2} width="18rem" height={13} />
                    </div>
                ))}
            <Skeleton width="7rem" />
        </div>
    );
};

export default TradingRecordCardSkeleton;