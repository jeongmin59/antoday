import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './BottomIcon.module.css'

interface BottomIconProps{
    icon: IconDefinition;
    text: string;
    url: string;
}

const BottomIcon :React.FC<BottomIconProps> = ({icon,text,url}) => {
    
    return (
        <Link to={url}>
            <FontAwesomeIcon className={styles.icon} icon={icon}/>
            <div className={styles.text} >{text}</div>
        </Link>
    )
};

export default BottomIcon;