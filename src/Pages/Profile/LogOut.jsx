import React from "react";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import useLangStore from "../../store/useLangStore";

const LogOut = () => {
  const { logOut } = useUserStore();
  const navigate = useNavigate();

  const { lang } = useLangStore();

  return (
    <div className="w-full pt-[2vmin] pb-[2vmin] flex flex-col items-center gap-[3vmin]">
      <h1 className="text-[19px]">{lang == "en" ? "Are you sure to you want log out?" : "დარწმუნებული ხართ რომ გინდათ გახვიდეთ?"}</h1>
      <div className="w-[80%] h-0.5 bg-amber-50"></div>
        <button
          className="w-[9rem] p-2 border border-red-600 text-red-600 font-light rounded-[6px] hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
          onClick={() => {
            logOut()
            navigate("/")
          }}
        >
          {lang == "en" ? "Log Out" : "გასვლა"}
        </button>
    </div>
  );
};

export default LogOut;
