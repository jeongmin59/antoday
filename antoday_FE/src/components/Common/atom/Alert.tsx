import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import styles from './Alert.module.css';
import { useRecoilState } from 'recoil';
import { isWriteAlertOpenAtom } from './../../../recoil/alert';

interface AlertProps{
    icon: IconDefinition;
    msg: string;
}

const Alert :React.FC<AlertProps> = ({ msg }) => {
    const [isWriteAlertOpen, setIsWriteAlertOpen] = useRecoilState(isWriteAlertOpenAtom);

    const hideAlert = () => {
        setIsWriteAlertOpen(false);
    };

    useEffect(() => {
        const isMobile = window.innerWidth <= 500;
        const timeoutDuration = isMobile ? 2500 : 4000;

        const timeoutId = setTimeout(hideAlert, timeoutDuration);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className={`${styles.alert} ${isWriteAlertOpen ? '' : styles.hide}`}>
            <FontAwesomeIcon icon={faCircleCheck}/>
            <span className={styles.msg}>{ msg }</span>
            <span className={styles.closeBtn} onClick={hideAlert}>
                <FontAwesomeIcon icon={faXmark} />
            </span>
        </div>
    );
};

export default Alert;