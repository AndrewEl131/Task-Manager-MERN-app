import React, { useState } from "react";
import useUserStore from "../../store/useUserStore";
import useLangStore from "../../store/useLangStore";

const ProfileEdit = () => {
  const { user, updateUserField } = useUserStore();
  const [isEnabled, setIsEnabled] = useState("");
  const [userName, setUsername] = useState(user.username);
  const [err, setErr] = useState("");

  const { lang } = useLangStore();

  return (
    <>
      <div className="w-full flex flex-col items-center text-[22px] pt-[3vmin] gap-[2vmin]">
        {/* Username Input */}
        <div className="w-[50vmin] flex flex-col gap-[2vmin] relative">
          <label className="w-full text-2xl">{lang === "en" ? "Username" : "მომხმარებლის სახელი"}</label>
          <input
            type="text"
            placeholder={lang === "en" ? "Enter Username" : "დაწერეთ მომხმარებლის სახელი"}
            value={userName}
            disabled={!isEnabled.includes("title")}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[50vmin] p-[1.3vmin] glow-border"
          />
          <div
            className="absolute right-[0.8vmin] bottom-[0.9vmin] w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-[50%] cursor-pointer border"
            onClick={() => setIsEnabled("title")}
          >
            <i className="text-[22px] bxr bx-pencil"></i>
          </div>
        </div>

        {/* Error Message */}
        {err.includes("title") && (
          <div
            className="w-[50vmin] h-[3vh] absolute top-[24.5vmin] text-red-600 text-shadow-none"
          >
           {lang === "en" ? "Please Enter Username" : "გთხოვთ მიუთითეთ სახელი"}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="w-full flex justify-center mt-[5vmin]">
        <button
          className="w-[9rem] p-2 border border-red-600 text-red-600 font-light rounded-[6px] hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
          onClick={() => updateUserField("username", userName)}
        >
          {lang === "en" ? "Edit" : "რედაქტირება"}
        </button>
      </div>
    </>
  );
};

export default ProfileEdit;
