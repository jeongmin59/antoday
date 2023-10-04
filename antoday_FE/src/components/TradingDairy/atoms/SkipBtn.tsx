import { useNavigate } from "react-router";
import styles from "./SkipBtn.module.css";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../../recoil/auth";

const SkipBtn: React.FC<TradingRecord> = ({ tradePk }) => {
  const navigator = useNavigate();
  const token = useRecoilValue(accessTokenAtom);

  // const handleDelete = async () => {
  //   const url = import.meta.env.VITE_BACK_API_URL + `/api/trade/${tradePk}`;
  //   const response = await fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (response.ok) {
  //     console.log("삭제가 완료되었습니다");
  //     navigator("/tradingrecord");
  //   } else {
  //     console.error(await response.text());
  //   }
  // };

  const handleDelete = () => {
    navigator("/tradingrecord");
  }

  return (
    <button onClick={handleDelete} className={styles.button}>
      건너뛰기
    </button>
  );
};

export default SkipBtn;
