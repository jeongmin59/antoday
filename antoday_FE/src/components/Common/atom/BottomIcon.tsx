import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './BottomIcon.module.css'

interface BottomIconProps{
    icon: IconDefinition;
    text: string;
    url: string;
    inActive: boolean;
}

const BottomIcon :React.FC<BottomIconProps> = ({icon,text,url, isActive}) => {
    
    return (
        <Link to={url} className={isActive ? styles.activeTab : ''}>
            <FontAwesomeIcon className={styles.icon} icon={icon}/>
            <div className={styles.text} >{text}</div>
        </Link>
    )
};

export default BottomIcon;