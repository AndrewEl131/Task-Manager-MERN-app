import React, { use, useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import useUserStore from "../../store/useUserStore";
import useProjectStore from "../../store/useProjectStore";
import Task from "../../Component/Task";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../PageStyle.css";
import ProjectExplorer from "./ProjectExplorer";
import useLangStore from "../../store/useLangStore";

const Projects = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { projects, getAllProjects, updateProjectField, deleteProject } =
    useProjectStore();
  const [editingColorId, setEditingColorId] = useState(null);

  const { lang } = useLangStore();

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) return navigate("/Auth");
    if (projects?.length === 0) navigate("/AddProject");
  }, [projects]);

  const [sortMode, setSortMode] = useState("default");
  const [sortedProjects, setSortedProjects] = useState([]);

  useEffect(() => {
    let sorted = [...projects];

    switch (sortMode) {
      case "mostTasks":
        sorted.sort((a, b) => b.tasks.length - a.tasks.length);
        break;

      case "leastTasks":
        sorted.sort((a, b) => a.tasks.length - b.tasks.length);
        break;

      case "newest":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "oldest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      case "alphabetical":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        sorted = [...projects];
    }

    setSortedProjects(sorted);
  }, [projects, sortMode]);

  return (
    <main className="w-full h-[100vh]">
      <div className="w-full h-[95vh] pt-[3vmin] space-y-[3vmin]">
        <div className='w-full flex justify-evenly gap-[90vmin] lg:text-3xl font-["Outfit",_sans-serif] font-medium'>
          <span>{user.username}{lang == "en" ? "'s Workspace" : "ს სამუშო სივრცე"}</span>
          <span>{lang == "en" ? "Projects" : "პროექტები"}</span>
        </div>
        <div className="w-full flex h-auto">
          <ProjectExplorer
            mostFunc={() => setSortMode("mostTasks")}
            leastFunc={() => setSortMode("leastTasks")}
            newestFunc={() => setSortMode("newest")}
            oldestFunc={() => setSortMode("oldest")}
            alphabeticalFunc={() => setSortMode("alphabetical")}
          />
          <div className="lg:w-[155vmin] w-[100vmin] text-shadow-none flex flex-wrap lg:justify-start justify-center gap-[3vmin] pl-[2vmin] pt-[2vmin]">
            {sortedProjects?.map((item) => (
              <div
                className="w-[18.5rem] h-[11.5rem]"
                key={item._id}
                style={{ border: `1px solid ${item.color}` }}
                onClick={() => navigate(`/Task/${item._id}`)}
              >
                <div className="w-full h-[30%] flex flex-col items-center">
                  <div className='w-full h-[80%] flex justify-around items-center gap-[30%] font-["BBH_Sans_Bogle",_sans-serif] text-[24px]'>
                    <h1>{item.title}</h1>
                    <h1>{item.tasks.length} {lang == "en" ? "Task" : "ტასკი"}</h1>
                  </div>
                  <div className="w-[85%] h-0.5 bg-[#f7e8e8] rounded-2xl m-[auto_0_auto_0]"></div>
                </div>

                <div className="w-full h-[67%] flex flex-col relative">
                  <div className="w-full h-[65%] text-[11.5px] text-center pt-1">
                    <p>{item.desc}</p>
                  </div>

                  <div className="w-full h-[35%] flex justify-around text-2xl items-center z-10">
                    <i
                      className="cursor-pointer hover:text-red-600 transform duration-300 bxr  bx-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/EditProject/${item._id}`);
                      }}
                    ></i>
                    <i
                      className="cursor-pointer hover:text-red-600 transform duration-300 bxr  bx-rgb"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingColorId(item._id);
                      }}
                    ></i>
                    <i
                      className="cursor-pointer hover:text-red-600 transform duration-300 bxr  bx-trash"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(user._id, item._id);
                      }}
                    ></i>
                  </div>

                  {editingColorId === item._id && (
                    <div className="w-[7rem] h-[5rem] absolute lg:bottom-[-10vmin] bottom-[-20vmin] left-[5.8rem] flex flex-col gap-0.5 pt-1 items-center bg-[#fd000079]">
                      <div className="w-full flex justify-end pr-1 text-2xl">
                        <i
                          className="cursor-pointer bxr  bx-x"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingColorId(null);
                          }}
                        ></i>
                      </div>
                      <input
                        type="color"
                        className="w-[90%]"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateProjectField(
                            user._id,
                            item._id,
                            "color",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
