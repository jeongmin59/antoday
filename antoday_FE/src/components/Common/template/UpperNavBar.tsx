import React, { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMemoClick = () => {
    setIsMemoOpen(!isMemoOpen);
  };

  const handleLogout = () => {
    setToken("");
  };

  useEffect(() => {
    // 스크롤 이벤트를 감지하여 스크롤 위치에 따라 배경색 변경
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav>
      <div
        className={`${styles.navigation} ${isScrolled ? styles.scrolled : ""}`}
      >
        <Link to="/" className={styles.navItemHome}></Link>
        <Link to="/stocksearch" className={styles.navItemCompanyInfo}>
          종목정보
        </Link>
        <Link
          to={token ? "/tradingrecord" : "/login"}
          className={styles.navItemTradingRecord}
        >
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
        {token && (
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="lg"
            onClick={handleMemoClick}
            className={styles.navItemMemoIcon}
          />
        )}
      </div>
      <div>{token && <Memo isOpen={isMemoOpen} />}</div>
    </nav>
  );
};

export default UpperNavBar;
