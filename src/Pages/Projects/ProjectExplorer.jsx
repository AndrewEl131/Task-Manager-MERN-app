import React from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useProjectStore from "../../store/useProjectStore";
import useLangStore from "../../store/useLangStore";

const ProjectExplorer = ({mostFunc, leastFunc, newestFunc, oldestFunc, alphabeticalFunc}) => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { lang } = useLangStore();
  const { projects } = useProjectStore();
  return (
    <div className="w-[15rem] h-auto pt-[2.5vmin] pb-[2.5vmin] bg-[#ec173b6e] lg:flex lg:flex-col hidden">
      <div className="w-full p-[1vmin] text-[20px] flex flex-col items-center gap-[0.8vmin]">
        <h1 className="uk-glow">{projects?.length} {lang == "en" ? "Projects" : "პროექტი"}</h1>
        <div className="w-[80%] h-0.5 bg-blue-100"></div>
      </div>

      <div className='w-full p-[1vmin] text-[19px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'>
        <div className="w-full flex items-center justify-start pl-1.5 gap-2" onClick={() => mostFunc()}>
          <i className="text-[26px] text-[#00fff2] bxr  bx-chevron-up-circle"></i>
          <h1>{lang == "en" ? "Most tasks" : "მეტი ტასკი"}</h1>
        </div>
      </div>

      <div className='w-full p-[1vmin] text-[19px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'>
        <div className="w-full flex items-center justify-start pl-1.5 gap-2" onClick={() => leastFunc()}>
          <i className="text-[26px] text-[#00fff2] bxr  bx-chevron-down-circle"></i>
          <h1>{lang == "en" ? "Least tasks" : "ნაკლები ტასკი"}</h1>
        </div>
      </div>

      <div className='w-full p-[1vmin] text-[22px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'>
        <h1 className="uk-glow">{lang == "en" ? "Sorting" : "სორტირება"}</h1>
        <div className="w-[80%] h-0.5 bg-blue-100"></div>
      </div>

      <div className='w-full p-[1vmin] text-[19px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'>
        <div className="w-full flex items-center justify-start pl-1.5 gap-2" onClick={() => newestFunc()}>
          <i className="text-[26px] text-[#00fff2] bxr  bx-chevrons-up"></i>
          <h1>{lang == "en" ? "Newest" : "უახლესი"}</h1>
        </div>
      </div>

      <div className='w-full p-[1vmin] text-[19px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'>
        <div className="w-full flex items-center justify-start pl-1.5 gap-2" onClick={() => oldestFunc()}>
          <i className="text-[26px] text-[#00fff2] bxr  bx-chevrons-down"></i>
          <h1>{lang == "en" ? "Oldest" : "უძველესი"}</h1>
        </div>
      </div>

      <div className='w-full p-[1vmin] text-[19px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'>
        <div className="w-full flex items-center justify-start pl-1.5 gap-2" onClick={() => alphabeticalFunc()}>
          <i className='text-[26px] text-[#00fff2] bxr  bx-dialpad'  ></i> 
          <h1>{lang == "en" ? "Alphabetical" : "ანბანის მიხედვით"}</h1>
        </div>
      </div>

      <div className='w-full p-[1vmin] text-[22px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'>
        <h1 className="uk-glow">{lang == "en" ? "Pages" : "გვერდები"}</h1>
        <div className="w-[80%] h-0.5 bg-blue-100"></div>
      </div>

      <div
        className='w-full p-[1vmin] text-[19px] text-center cursor-pointer text-shadow-none font-["Ubuntu",_sans-serif] flex flex-col items-center gap-[0.5vmin] hover:text-blue-200 duration-200'
        onClick={() => navigate("/AddProject")}
      >
        <div className="w-full flex items-center justify-start pl-1.5 gap-2">
          <i className='text-[26px] text-[#00fff2] bxr  bx-plus-circle'  ></i> 
          <h1>{lang == "en" ? "Add Task" : "დაამატე ტასკი"}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;
