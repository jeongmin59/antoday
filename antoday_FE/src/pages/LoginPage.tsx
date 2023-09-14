import React from 'react';
import { kakaoLoginButton } from '../assets/img/login';


const LoginPage : React.FC = () => {
  // Kakao OAuth 2.0 인증 서버의 인증 요청 URL
  // Kakao OAuth 2.0 애플리케이션 정보
  const clientId  : string = 'ef1dbd44e7ef6634e3fec53570d8fd11';
  const redirectUri  : string = import.meta.env.VITE_FRONT_URL + '/oauth/callback/kakao';
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