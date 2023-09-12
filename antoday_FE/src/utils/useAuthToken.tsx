import { useRecoilState } from 'recoil';
import { accessToken } from '../recoil/auth';

export const useAuthToken = () => {
    const [token, setToken] = useRecoilState(accessToken)

    return {
        token,
        setToken,
    }
}