import React from "react";
import Header from "../../Component/Header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useProjectStore from "../../store/useProjectStore";
import useLangStore from "../../store/useLangStore";

const EditProject = () => {
  const { projectId } = useParams();

  const { user } = useUserStore();
  const { projects, setProjects } = useProjectStore();
  const { lang } = useLangStore();

  const project = projects.find((p) => p._id === projectId);

  const navigate = useNavigate();

  const [err, setErr] = useState();

  const [title, setTitle] = useState(project?.title);
  const [desc, setDesc] = useState(project?.desc);
  const [color, setColor] = useState(project?.color)

  const handleEdit = async () => {
    const res = await fetch(
      `http://localhost:3000/api/user/${user._id}/project/${projectId}`,
      {
        method: "PUT",
        body: JSON.stringify({ title, desc, color }),
        headers: { "Content-Type": "application/json" }
      }
    );

    const data = await res.json();

    if (!res.ok) return console.log(`error: ${data.errorMessage}`);

    setProjects(data);

    navigate("/Projects");
  };

  return (
    <main className="w-full min-h-screen">
      <Header />
      <div className="w-full h-[95vh] pt-[5vmin]">
        <div className="w-full flex justify-center">
          <div className="w-[70vmin] h-[75vh] bg-[url(./assets/Box-bg.svg)] flex flex-col items-center gap-[5vmin] pt-[3vmin]">
            <div className="w-[50vmin] flex flex-col gap-[1vmin]">
              <label className="w-full text-2xl">{lang == "en" ? "Title Of Project" : "პროექტის სათაური"}</label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[50vmin] p-[1.3vmin] glow-border"
              />
            </div>

            <div className="w-[50vmin] flex flex-col gap-[1vmin]">
              <label className="w-full text-2xl">{lang == "en" ? "Description Of Project" : "პროექტის აღწერა"}</label>
              <textarea
                className="w-[50vmin] h-[20vh] p-[1vmin] glow-border"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                maxLength={226}
              ></textarea>
            </div>

            <div className="w-[50vmin] flex flex-col gap-[1vmin]">
            <div className="w-full text-2xl text-center">{lang == "en" ? "Color of project" : "პროექტის ფერი"}</div>
            <div className="w-full flex justify-center">
              <input
                type="color"
                className="w-[40vmin]"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[10vh] flex justify-evenly items-center">
          <button
            className={`w-[9rem] p-3 border border-red-600 text-red-600 font-light rounded-[6px]  hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer`}
            onClick={handleEdit}
          >
            {lang == "en" ? "Edit" : "რედაქტირება"}
          </button>
          <button
            className="w-[9rem] p-3 border border-blue-300 text-blue-300 font-light rounded-[6px] hover:border-amber-50 hover:text-amber-50 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
            onClick={() => navigate("/Rules")}
          >
            {lang == "en" ? "Learn More" : "გაიგე მეტი"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditProject;
