import Axios from "axios";
import { useAuthToken } from "../utils/useAuthToken";
import { useRecoilState } from 'recoil';
import { accessToken } from "../recoil/auth";

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    "Content-Type": "application/json"
  }
})

const token = useRecoilState(accessToken)

axiosInstance.interceptors.request.use(
  async(config) => {
    try {
      // Recoil의 useRecoilValue를 사용하여 토큰 값을 가져옴.
      const {token} = useAuthToken();
      // accessToken 이 null 값이 아닐때, headers에 추가
      if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    } catch (error) {
      console.error("Axios 인터셉터에서 에러 발생:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
