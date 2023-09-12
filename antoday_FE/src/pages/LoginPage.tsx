import React from 'react';
import { kakaoLoginButton } from '../assets/img/login';


const LoginPage : React.FC = () => {
  // Kakao OAuth 2.0 인증 서버의 인증 요청 URL
  
  // Kakao OAuth 2.0 애플리케이션 정보
  const clientId  : string = '654eff43d00e657aa6a3aa1a33063618';
  const redirectUri  : string = 'http://localhost:5173/oauth';
  
  const kakaoURL : string = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  return (
    <>
    <div>
      <img src={kakaoLoginButton} alt="loginButton" onClick={handleLogin}/>
    </div>
    </>
  )
}

export default LoginPage;