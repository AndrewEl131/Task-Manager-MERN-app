import React from "react";
import useUserStore from "../../store/useUserStore";
import useLangStore from "../../store/useLangStore";

const AboutProfile = () => {
  const { user } = useUserStore();
  const { lang } = useLangStore();

  return (
    <div className="w-full text-[22px] pl-[2vmin] space-y-[2vmin]">
      <h1>{lang === "en" ? "Username:" : "მომხარების სახელი:"} {user.username}</h1>
      <h1>{lang === "en" ? "Date:" : "თარიღი:"} {new Date(user.createdAt).toLocaleDateString()}</h1>
      <h1>{lang === "en" ? "Projects:" : "პროექტები:"} {user?.projects?.length}</h1>
    </div>
  );
};

export default AboutProfile;
