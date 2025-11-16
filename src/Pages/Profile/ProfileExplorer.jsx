import React from "react";
import useLangStore from "../../store/useLangStore";

const ProfileExplorer = ({ setFunc }) => {
  const { lang } = useLangStore();
  return (
    <div className="lg:w-[28vmin] w-[100vmin] pt-[5vmin] pb-[5vmin] lg:pr-[2vmin] flex flex-col gap-[3vmin] lg:border-r">
      <div
        className="w-full p-1.5 text-center cursor-pointer border hover:bg-[#d31e4bd3] transition duration-300s glow-border"
        onClick={() =>
          setFunc(`${lang == "en" ? "About Profile" : "პროფილის შესახებ"}`)
        }
      >
        <h1>{`${lang == "en" ? "About Profile" : "პროფილის შესახებ"}`}</h1>
      </div>
      <div
        className="w-full p-1.5 text-center cursor-pointer border hover:bg-[#d31e4bd3] transition duration-300 glow-border"
        onClick={() =>
          setFunc(`${lang == "en" ? "Profile Edit" : "პროფილის რედაქტირება"}`)
        }
      >
        <h1>{`${lang == "en" ? "Profile Edit" : "პროფილის რედაქტირება"}`}</h1>
      </div>
      <div
        className="w-full p-1.5 text-center cursor-pointer border hover:bg-[#d31e4bd3] transition duration-300 glow-border"
        onClick={() =>
          setFunc(`${lang == "en" ? "Password Edit" : "პაროლის რედაქტირება"}`)
        }
      >
        <h1>{`${lang == "en" ? "Password Edit" : "პაროლის რედაქტირება"}`}</h1>
      </div>
      <div
        className="w-full p-1.5 text-center cursor-pointer border hover:bg-[#d31e4bd3] transition duration-300 glow-border"
        onClick={() => setFunc(`${lang == "en" ? "Log Out" : "გასვლა"}`)}
      >
        <h1>{`${lang == "en" ? "Log Out" : "გასვლა"}`}</h1>
      </div>
    </div>
  );
};

export default ProfileExplorer;
