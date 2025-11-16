import React from "react";
import Logo from "../../assets/Logo.png";
import Git from "../../assets/github-brands-solid-full.svg";
import linkedIn from "../../assets/linkedin-brands-solid-full.svg";

const Footer = () => {
  return (
    <footer className="w-full h-[15vh] pt-[1vmin] hidden lg:flex justify-center">
      <div className="w-[120vmin] h-full flex">
        <div className="w-[35%] h-full flex justify-center items-center">
          <h1 className="footer-glow lg:text-4xl">Task Manager</h1>
        </div>

        <div className="w-[25%] h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-2xl default-text">Author:</h1>
          <p className="lg:text-[18px]">Andy Elizbarashvili</p>
        </div>

        <div className="w-[25%] h-full">
          <div className="w-full h-[50%] text-2xl flex justify-center items-end">
            <h1>Social</h1>
          </div>

          <div className="w-full h-[50%] flex justify-center items-start gap-7">
            <a href="https://github.com/AndrewEl131">
              <img src={Git} alt="github" className="h-12" />
            </a>
            <a href="https://www.linkedin.com/in/andy-elizbarashvilii-4b0b67343">
              <img src={linkedIn} alt="" className="h-12" />
            </a>
          </div>
        </div>

        <div className="w-[15%] h-full text-5xl flex justify-center items-center">
          <h1>©</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
