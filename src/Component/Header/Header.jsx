import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../../store/useUserStore";
import useLangStore from "../../store/useLangStore";

const Header = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const { lang, toggleLang } = useLangStore();

  const handleTasksClick = () => {
    if (user?.tasks?.length === 0) {
      navigate("/AddTask");
    } else {
      navigate("/Projects");
    }
  };

  const handleLogInClick = () => {
    if (user && Object.keys(user).length > 0) {
      navigate("/Profile");
    } else {
      navigate("/Auth");
    }
  };

  const translations = {
    en: {
      profile: "Profile",
      login: "Log In",
    },
    ka: {
      profile: "პროფილი",
      login: "შესვლა",
    },
  };

  return (
    <header className="w-full h-[5vh] flex lg:justify-center justify-between">
      <div className="lg:w-[120vmin] hidden w-[90%] h-full lg:flex justify-evenly items-center glow-border">
        <div className="w-[20rem] h-[85%] flex">
          <div
            className="w-[50%] lg:text-[22px] h-full flex justify-center items-center"
            onClick={handleTasksClick}
          >
            <h1 className="nav-item">
              {lang == "en" ? "Projects" : "პროექტები"}
            </h1>
          </div>

          <div
            className="w-[50%] lg:text-[22px] h-full flex justify-center items-center"
            onClick={() => handleLogInClick()}
          >
            <h1 className="nav-item">
              {Object.keys(user).length > 0
                ? translations[lang].profile
                : translations[lang].login}
            </h1>
          </div>
        </div>
        <div className="w-[29vmin] h-[90%] lg:text-[32px] flex justify-center items-center">
          <div className="w-[20%] rounded-[50%] flex justify-center items-center">
            <Link to={"/"} className="mt-[1vmin]">
              <i className="bxr  bx-home nav-item"></i>
            </Link>
          </div>
        </div>
        <div className="w-[20rem] h-[85%] flex">
          <div className="w-[50%] lg:text-[22px] h-full flex justify-center items-center">
            <Link to={"/Rules"}>
              <h1 className="nav-item">{lang == "en" ? "Rules" : "წესები"}</h1>
            </Link>
          </div>

          <div
            className="w-[50%] lg:text-[22px] h-full flex justify-center items-center"
            onClick={() => toggleLang()}
          >
            <h1 className="uk-glow cursor-pointer">
              {lang == "en" ? "English" : "ქართული"}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-[5rem] h-full text-4xl flex justify-center items-center lg:hidden" onClick={() => navigate("/")}>
        <i className="bxr  bx-home"></i>
      </div>

      <div
        className="w-[5rem] h-full text-4xl flex justify-center items-center lg:hidden"
        onClick={() => setIsBurgerOpen(true)}
      >
        <i class="bxr  bx-menu-right"></i>
      </div>

      {isBurgerOpen && (
        <div className='w-[50vmin] h-[120vmin] pt-[15vmin] pb-[3vmin] space-y-[10vmin] z-10 bg-[#1d0308] text-2xl font-["Stack_Sans_Notch",_sans-serif]'>
          <div
            className="w-full text-center text-shadow-none cursor-pointer"
            onClick={handleTasksClick}
          >
            {lang == "en" ? "Projects" : "პროექტები"}
          </div>
          <div
            className="w-full text-center text-shadow-none cursor-pointer"
            onClick={() => handleLogInClick()}
          >
            {Object.keys(user).length > 0
              ? translations[lang].profile
              : translations[lang].login}
          </div>
          <div
            className="w-full text-center text-shadow-none cursor-pointer"
            onClick={() => navigate("/Rules")}
          >
            {lang == "en" ? "Rules" : "წესები"}
          </div>
          <div
            className="w-full text-center text-shadow-none cursor-pointer"
            onClick={() => toggleLang()}
          >
            {lang == "en" ? "English" : "ქართული"}
          </div>
          <div
            className="absolute right-[40vmin] top-[1vmin] text-shadow-none cursor-pointer"
            onClick={() => setIsBurgerOpen(false)}
          >
            <i class="bxr  bx-x"></i>{" "}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
