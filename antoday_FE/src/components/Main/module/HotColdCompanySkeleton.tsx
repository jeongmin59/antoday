import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './HotColdCompanySkeleton.module.css';

const HotColdCompanySkeleton: React.FC = () => {
    return (
        <div className={styles.skeletonContainer}>
            {Array(10) 
                .fill(0)
                .map((_, i) => (
                    <div key={i} className={styles.cardSkeleton}>
                        <div className={styles.contentWrapper}>
                            <Skeleton className={styles.content} />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default HotColdCompanySkeleton;
