import { create } from "zustand";

const useLangStore = create((set, get) => ({
    lang: localStorage.getItem("lang") || "en",

    toggleLang: () => {
        set(state => {
            const newLang = state.lang === "en" ? "ka" : "en";
            localStorage.setItem("lang", newLang);
            return { lang: newLang };
        })
    }
}))

export default useLangStore;