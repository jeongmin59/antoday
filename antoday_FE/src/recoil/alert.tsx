import { atom } from "recoil";

export const isAlertOpenAtom = atom({
    key: "isAlertOpenAtom",
    default: {
        isOpen: false,
        status: '',
    },
});