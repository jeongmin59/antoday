import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./StockInfoPage.module.css";

const StockInfoPage: React.FC = () => {
  return (
    <React.Fragment>
      종목정보검색
      <FontAwesomeIcon icon={faHeart} size="2x" style={{ color: "black" }} />
    </React.Fragment>
  );
};

export default StockInfoPage;
