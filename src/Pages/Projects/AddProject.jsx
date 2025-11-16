import React, { useState, useEffect } from "react";
import Header from "../../Component/Header/Header";
import useUserStore from "../../store/useUserStore";
import useProjectStore from "../../store/useProjectStore";
import useLangStore from "../../store/useLangStore";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { addProject } = useProjectStore();
  const { lang } = useLangStore();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#f2073a");

  return (
    <main className="w-full h-[100vh]">
      <Header />
      <div className="w-full h-[95vh] flex flex-col items-center gap-[3vmin] pt-[3vmin]">
        <div className="w-full text-center text-3xl text-shadow-none">
          {lang == "en" ? "Add Projects" : "დაამატე პროექტი"}
          <span className="text-amber-400"> Add It</span>
        </div>
        <div className='w-[80vmin] h-[63.5vmin] flex flex-col gap-[3vmin] pt-[3vmin] rounded-[8px]' style={{border: `1px solid ${color}`}}>
          <div className="w-full text-2xl text-center">{lang == "en" ? "Title of project" : "პროექტის სათაური"}</div>
          <div className="w-full flex justify-center">
            <input
              type="text"
              className="w-[40vmin] p-2 border glow-border"
              placeholder={lang == "en" ? "Enter a Title" : "მიუთითეთ სათაური"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-full text-2xl text-center">
            {lang == "en" ? "Descripition of project" : "პროექტის აღწერა"}
          </div>
          <div className="w-full flex justify-center">
            <textarea
              className="w-[40vmin] h-[15vmin] glow-border text-[14.5px] p-1.5 border"
              value={desc}
              placeholder={lang == "en" ? "Enter a Descripition of project" : "მიუთითეთ პროექტის აღწერა"}
              onChange={(e) => {setDesc(e.target.value)}}
              maxLength={130}
            ></textarea>
          </div>

          <div className="w-full text-2xl text-center">{lang == "en" ? "Color of the project" : "პროექტის ფერი"}</div>
          <div className="w-full flex justify-center">
            <input
              type="color"
              className="w-[40vmin]"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-center">
            <button
              className="w-[18vmin] p-2 border border-red-600 text-red-600 font-light rounded-[6px] hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
              onClick={async () => {
               await addProject(user._id, title, desc, color);
                navigate("/Projects");
              }}
            >
              {lang == "en" ? "Add Project" : "დაამატე პროექტი"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProject;
