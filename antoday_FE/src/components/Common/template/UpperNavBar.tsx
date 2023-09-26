import React, { useState } from "react";
import styles from "./UpperNavBar.module.css";
import { Link } from "react-router-dom";
import { logoDefaultWhite } from "../../../assets/img/logo";
import { logoIconMobile } from "../../../assets/img/logo";
import { memo } from "../../../assets/img/common";
import { useRecoilState } from "recoil";
import { accessTokenAtom } from "../../../recoil/auth";
import { userNameAtom } from "../../../recoil/user";
import Memo from "./Memo";

const UpperNavBar: React.FC = () => {
  const [token, setToken] = useRecoilState(accessTokenAtom);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const handleMemoClick = () => {
    if (!isMemoOpen) {
      setIsMemoOpen(!isMemoOpen);
    }
  };

  const handleCloseMemo = () => {
    setIsMemoOpen(false);
  };

  const handleLogout = () => {
    setToken("");
  };

  return (
    <nav className={styles.navigation}>
      <Link to="/" className={styles.navItemHome}>
        <img
          src={window.innerWidth <= 480 ? logoIconMobile : logoDefaultWhite}
          alt="로고 이미지"
          className={window.innerWidth <= 480 ? styles.logoMobile : styles.logoDefault} // 클래스를 조건부로 적용
        />
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
      <br />
      <img src={memo} alt="메모" onClick={handleMemoClick} />
      {isMemoOpen && (
        <Memo onClose={handleCloseMemo} isMemoVisible={isMemoOpen} />
      )}
    </nav>
  );
};

export default UpperNavBar;
