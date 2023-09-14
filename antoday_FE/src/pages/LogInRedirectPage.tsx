import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accessToken } from '../recoil/auth';

const LogInRedirectPage : React.FC = () => {
	  const code = new URL(window.location.href).searchParams.get('code');
    const navigator = useNavigate();
		const [token,setToken] = useRecoilState(accessToken);

    useEffect(() => {
			const kakaoLogin = async () => {
        console.log('요청이 두번가나?')
				try {
					const response = await axios({
						method: "GET",
            url: `http://j9e107.p.ssafy.io:8080/api/user/login?code=${code}`,
            headers: {
            "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
            "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
        },
					})
					console.log('로그인 성공', response.data);
					setToken(response.data.tokenInfo.accessToken)
					navigator('/');  //홈화면으로 이동
				} catch (error) {
					console.log('로그인 에러',error)
				}

			}

			kakaoLogin();
		},[]);

    return ( 
        <React.Fragment>
          로딩중...
        </React.Fragment>
    );
}

export default LogInRedirectPage;