import React, { useState } from "react";
import styles from "./UpperNavBar.module.css";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../../recoil/auth";
import { userNameAtom } from "../../../recoil/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Memo from "./Memo";

const UpperNavBar: React.FC = () => {
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const userName = useRecoilValue(userNameAtom);
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const handleMemoClick = () => {
      setIsMemoOpen(!isMemoOpen);
  };

  const handleLogout = () => {
    setToken("");
  };

  return (
    <nav>
    <div className={styles.navigation}>
      <Link to="/" className={styles.navItemHome}>
        {/* <div className={styles.navMainImage}></div> */}
      </Link>
      <Link to="/stocksearch" className={styles.navItemCompanyInfo}>
        종목정보
      </Link>
      <Link to="/tradingrecord" className={styles.navItemTradingRecord}>
        매매일지
      </Link>
      {token ? (
        <Link to="/" className={styles.navItemLogin} onClick={handleLogout}>
          {userName}님
        </Link>
      ) : (
        <Link to="/login" className={styles.navItemLogin}>
          로그인
        </Link>
      )}
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleMemoClick} className={styles.navItemMemoIcon}/>
    </div>
    <div className={`${styles.memoContainer} ${isMemoOpen ? styles.open : ''}`}>
        {isMemoOpen && (
          <div className={styles.memoContent}>
            <Memo />
          </div>
        )}
      </div>
    </nav>
  );
};

export default UpperNavBar;
