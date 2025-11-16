import React from "react";
import Header from "../../Component/Header/Header";
import { useState, useEffect } from "react";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import useProjectStore from "../../store/useProjectStore";
import useLangStore from "../../store/useLangStore";

const LogIn = () => {
  const navigate = useNavigate();
  const { register, logIn, user, error, setError } = useUserStore();
  const {setProjects} = useProjectStore();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [err, setErr] = useState("");

  const {lang} = useLangStore();

  function handleReg() {
    if (username.length === 0 && password.length === 0)
      return setErr("username password");
    if (username.length === 0 && rePassword.length === 0)
      return setErr("username repass");
    if (password.length === 0 && rePassword.length === 0)
      return setErr("password repass");
    if (
      password.length === 0 &&
      rePassword.length === 0 &&
      username.length === 0
    )
      return setErr("password repass username");

    if (username.length === 0) return setErr("usernamereg");
    if (password.length === 0) return setErr("passwordreg");
    if (rePassword.length === 0) return setErr("repass");

    if (password !== rePassword) return;

    if (error.length > 0) return;

    register(username, password, rePassword);
  }

  async function handleLogin() {
    if (username.length === 0 && password.length === 0)
      return setErr("username password");

    if (username.length === 0) return setErr("username");
    if (password.length === 0) return setErr("password");

    if (error.length > 0) return;

    const success = await logIn(username, password);
    if (success) {
      const updatedUser = useUserStore.getState().user;
      setProjects(updatedUser.projects)
      navigate("/")
    } else {
      alert("Login failed");
    }
  }

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [user]);

  const translations = {
    en: {
      login: "Log In",
      reg: "Register",
    },
    ka: {
      login: "შესვლა",
      reg: "რეგისტრაცია",
    },
  };

  return (
    <main className="w-full h-[100vh]">
      <Header />
      <div className="w-full h-[90%] flex justify-center">
        <div className="w-[120vmin] h-full flex flex-col items-center gap-[4vmin] pt-[5vmin]">
          <div className="w-full text-red-500 text-4xl text-center">
            <h1>{lang == "en" ? "Log In" : "შესვლა"}</h1>
          </div>
          <div className="lg:w-[450px] w-[90vmin] h-auto bg-[#1c1f2b] pt-[3vmin] pb-[3vmin] flex flex-col gap-[5vmin] rounded-[8px] relative lg:top-0 top-[15vmin]">
            {isLoginForm ? (
              <>
                <div className="w-full h-[5rem] text-[22px] pl-[3vmin] flex flex-col gap-[1vmin]">
                  <label>{lang == "en" ? "Username:" : "მომხმარებლის სახელი:"}</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value), setError("");
                    }}
                    className="w-[90%] p-3.5 bg-[#1f222e] rounded-[8px] text-[15px] text-gray-200 placeholder:text-[15px] border"
                    placeholder="Enter a username"
                  />
                  {err.includes("username") && (
                    <div className="w-[20rem] p-1 text-[12px] text-red-600 absolute top-[27.5%]">
                      {lang == "en" ? "Please Enter Username" : "გთხოვთ მიუთითეთ მომხმარებლის სახელი"}
                    </div>
                  )}
                </div>

                <div className="w-full h-[5rem] text-[22px] pl-[3vmin] flex flex-col gap-[1vmin]">
                  <label>{lang == "en" ? "Password:" : "პაროლი:"}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => (setPassword(e.target.value), setError(""))}
                    className="w-[90%] p-3.5 bg-[#1f222e] rounded-[8px] text-[15px] text-gray-200 placeholder:text-[15px] border"
                    placeholder="Enter a password"
                  />
                  {err.includes("password") && (
                    <div className="w-[20rem] p-1 text-[12px] text-red-600 absolute top-[56%]">
                      {lang == "en" ? "Please Enter Password" : "გთხოვთ მიუთითეთ პაროლი"}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-[5rem] text-[22px] pl-[3vmin] flex flex-col gap-[1vmin]">
                  <label>{lang == "en" ? "Username:" : "მომხმარებლის სახელი:"}</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value), setError("")}}
                    className="w-[90%] p-3.5 bg-[#1f222e] rounded-[8px] text-[15px] text-gray-200 placeholder:text-[15px] border"
                    placeholder={lang == "en" ? "Please Enter Username" : "მიუთითეთ მომხმარებლის სახელი"}
                  />
                  {err.includes("usernamereg") && (
                    <div className="w-[20rem] p-1 text-[12px] text-red-600 absolute top-[27.5%]">
                      {lang == "en" ? "Please Enter Username" : "მიუთითეთ მომხმარებლის სახელი"}
                    </div>
                  )}
                </div>

                <div className="w-full h-[5rem] text-[22px] pl-[3vmin] flex flex-col gap-[1vmin]">
                  <label>{lang == "en" ? "Password:" : "პაროლი:"}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value), setError("")}}
                    className="w-[90%] p-3.5 bg-[#1f222e] rounded-[8px] text-[15px] text-gray-200 placeholder:text-[15px] border"
                    placeholder="Enter a password"
                  />
                  {err.includes("repass") && (
                    <div className="w-[20rem] p-1 text-[12px] text-red-600 absolute top-[43.5%]">
                      {lang == "en" ? "Re Writed password is wrong" : "გამეორებული პაროლი არასწორია"}
                    </div>
                  )}
                </div>

                <div className="w-full h-[5rem] text-[20px] pl-[3vmin] flex flex-col gap-[1vmin]">
                  <label>{lang == "en" ? "Re Write Password:" : "გაიმეორეთ პაროლი:"}</label>
                  <input
                    type="password"
                    value={rePassword}
                    onChange={(e) => {setRePassword(e.target.value), setError("")}}
                    className="w-[90%] p-3.5 bg-[#1f222e] rounded-[8px] text-[15px] text-gray-200 placeholder:text-[15px] border"
                    placeholder="Rewrite a password"
                  />
                  {err.includes("repass") && (
                    <div className="w-[20rem] p-1 text-[12px] text-red-600 absolute top-[66%]">
                      {lang == "en" ? "Re Writed password is wrong" : "გამეორებული პაროლი არასწორია"}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="w-full flex justify-center mt-[1.5vmin]">
              <button
                className="w-[8.5rem] p-2 border border-cyan-300 text-cyan-300 font-light rounded-[6px]  hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
                onClick={() => {
                  if (!isLoginForm) {
                    handleReg();
                  } else {
                    handleLogin();
                  }
                }}
              >
                {isLoginForm ?  translations[lang].login
                : translations[lang].reg}
              </button>
            </div>

            <div className="w-full flex justify-evenly">
              <button
                className="w-[5rem] p-1 border text-[14px] font-light rounded-[6px] hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
                onClick={() => setIsLoginForm(true)}
              >
                {lang == "en" ? "Log In" : "შესვლა"}
              </button>

              <button
                className="w-[5.8rem] p-1 border text-[13px] font-light rounded-[6px] hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
                onClick={() => setIsLoginForm(false)}
              >
                {lang == "en" ? "Register" : "რეგისტრაცია"}
              </button>
            </div>
            {error.length > 0 && (
              <div className="w-full text-center text-red-600">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogIn;
