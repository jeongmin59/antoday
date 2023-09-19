import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./StockInfoPage.module.css";

const StockInfoPage: React.FC = () => {
  const { stockPk } = useParams();

  return (
    <React.Fragment>
      <h2>Stock Info Page</h2>
      <p>Stock PK: {stockPk}</p>
      <FontAwesomeIcon icon={faHeart} size="2x" style={{ color: "black" }} />
    </React.Fragment>
  );
};

export default StockInfoPage;
