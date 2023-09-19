import React from "react";
import styles from "./LoginPage.module.css";
import { kakaoLoginButton } from "../assets/img/login";
import { AntDefault } from "../assets/img/ant";

const LoginPage: React.FC = () => {
  // Kakao OAuth 2.0 인증 서버의 인증 요청 URL
  // Kakao OAuth 2.0 애플리케이션 정보
  const clientId: string = "ef1dbd44e7ef6634e3fec53570d8fd11";
  const redirectUri: string =
    import.meta.env.VITE_FRONT_URL + "/oauth/callback/kakao";
  const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className={styles.logInContainer}>
      <img className={styles.antImage} src={AntDefault} alt="antImage" />
      <p className={styles.welcomeText}>로그인 후 오늘도 매매기록 쓰러가기!</p>
      <img
        className={styles.logInButton}
        src={kakaoLoginButton}
        alt="loginButton"
        onClick={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
