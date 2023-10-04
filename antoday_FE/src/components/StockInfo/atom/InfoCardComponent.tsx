import React from "react";
import styles from "./InfoCardComponent.module.css";

interface InfoCardComponentProps {
  title: string;
  number: number;
}

const InfoCardComponent: React.FC<InfoCardComponentProps> = ({
  title,
  number,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>{title}</div>
      <div>{number}</div>
    </div>
  );
};

export default InfoCardComponent;
