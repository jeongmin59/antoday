import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});
//
export const userNameAtom = atom({
  key: "userNameAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
