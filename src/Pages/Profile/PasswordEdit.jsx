import React from "react";
import { useState } from "react";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import useLangStore from "../../store/useLangStore";

const PasswordEdit = () => {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const { user, changePassword, error, setError } = useUserStore();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const [isEnabled, setIsEnabled] = useState("");

  return (
    <div className="w-full flex flex-col pt-[3vmin] items-center gap-[3.5vmin]">
      <div className="w-[50vmin] flex flex-col gap-[2vmin] relative">
        <label className="w-full text-2xl">{lang == "en" ? "Old Password" : "ძველი პაროლი"}</label>
        <input
          type="text"
          placeholder={lang == "en" ? "Enter Old Password" : "დაწერეთ ძველი პაროლი"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-[50vmin] p-[1.3vmin] glow-border"
        />
      </div>

      <div className="w-[50vmin] flex flex-col gap-[2vmin]  relative">
        <label className="w-full text-2xl">{lang == "en" ? "New Password" : "ახალი პაროლი"}</label>
        <input
          type="text"
          placeholder={lang == "en" ? "Enter New Password" : "დაწერეთ ახალი პაროლი"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-[50vmin] p-[1.3vmin] glow-border"
        />
      </div>

      <div className="w-[50vmin] flex flex-col gap-[2vmin] relative">
        <label className="w-full text-2xl">{lang == "en" ? "Rewrite New Password" : "გაიმეორეთ ახალი პაროლი"}</label>
        <input
          type="text"
          placeholder={lang == "en" ? "Enter New Password" : "დაწერეთ ახალი პაროლი"}
          value={reNewPassword}
          onChange={(e) => setReNewPassword(e.target.value)}
          className="w-[50vmin] p-[1.3vmin] glow-border"
        />
      </div>

      <div className="w-full flex justify-center">
        {error && <p className="text-red-500 absolute bottom-[30vmin]">{error}</p>}
        <button
          className="w-[13rem] p-2 border border-red-600 text-red-600 font-light rounded-[6px] hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
          onClick={async () => {
            if (newPassword !== reNewPassword) {
              setError("New Password not match")
              return;
            }

            const success = await changePassword(
              oldPassword,
              newPassword
            );
            if (success) {
              navigate("/");
            } 
          }}
        >
          {lang == "en" ? "Change Password" : "პაროლის შეცვლა"}
        </button>
      </div>
    </div>
  );
};

export default PasswordEdit;
