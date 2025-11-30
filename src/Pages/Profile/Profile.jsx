import React from "react";
import Header from "../../Component/Header/Header";
import useUserStore from "../../store/useUserStore";
import { useState, useEffect } from "react";
import ProfileExplorer from "./ProfileExplorer";
import AboutProfile from "./AboutProfile";
import ProfileEdit from "./ProfileEdit";
import PasswordEdit from "./PasswordEdit";
import LogOut from "./LogOut";
import useLangStore from "../../store/useLangStore";

const Profile = () => {
  const {lang} = useLangStore();
  
  const { user } = useUserStore();

  const [form, setForm] = useState(`${lang == "en" ? "About Profile" : "პროფილის შესახებ"}`);

  useEffect(() => {
      document.title = `${user.username}'s Profile`;
    }, []);

  const enTitle = `hello, ${user.username} !`
  const geTitle = `გამარჯობა, ${user.username} !`

  const forms = {
    en: {
      AboutProfile: "About Profile",
      ProfileEdit: "Profile Edit",
      PasswordEdit: "Password Edit",
      LogOut: "Log Out"
    },
    ka: {
      AboutProfile: "პროფილის შესახებ",
      ProfileEdit: "პროფილის რედაქტირება",
      PasswordEdit: "პაროლის რედაქტირება",
      LogOut: "გასვლა"
    }
  }


  return (
    <main className="w-full h-[100vh]">
      <div className="w-full h-[95vh]">
        <div className="w-[120vmin] h-full m-auto pt-[5vmin] space-y-[3.5vmin]">
          <div className='w-full text-5xl font-["BBH_Sans_Bogle",_sans-serif]'>
            <h1>{lang == "en" ? enTitle : geTitle}</h1>
          </div>
          <div className="w-full lg:flex">
            <ProfileExplorer setFunc={(value) => setForm(value)} />
            <div className="lg:w-[85vmin] w-[100vmin] pt-[1vmin] pb-[1vmin] space-y-[2.5vmin]">
              <div className='w-full text-[32px] text-center font-["ubuntu",_sans_serif] text-[#e24a4a]'>
                {form}
              </div>

              {form === forms[lang].AboutProfile && <AboutProfile />}
              {form === forms[lang].ProfileEdit && <ProfileEdit />}
              {form === forms[lang].PasswordEdit && (<PasswordEdit />)}
              {form === forms[lang].LogOut && (<LogOut />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
