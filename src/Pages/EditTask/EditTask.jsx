import React, { useEffect } from "react";
import Header from "../../Component/Header/Header";
import { useState } from "react";
import useUserStore from "../../store/useUserStore";
import useTaskStore from "../../store/useTaskStore";
import useProjectStore from "../../store/useProjectStore";
import useLangStore from "../../store/useLangStore";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTask = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();
  const { projectId, taskId } = useParams();

  const { deleteTask } = useTaskStore();
  const { setProjects } = useProjectStore();
  const { lang } = useLangStore();

  const [task, setTask] = useState({});

  const [title, setTitle] = useState(task?.title || "");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Normal");

  const [isEnabled, setIsEnabled] = useState("");

  const [err, setErr] = useState("");

  async function fetchTask(userId, taskID) {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}/task/${taskId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    setTask(data);
  }

  async function updateTask(userId, taskID) {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}/task/${taskID}`,
      {
        method: "PUT",
        body: JSON.stringify({ title, desc, status, priority }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    setProjects(data)
    navigate("/Projects");
  }

  useEffect(() => {
    fetchTask(user._id, taskId);
  }, []);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDesc(task.desc || "");
      setStatus(task.status || "To Do");
      setPriority(task.priority || "Normal");
    }
  }, [task]);

  return (
    <main className="w-full h-[100vh]">
      <Header />
      <div className="w-full h-[95vh] flex flex-col items-center gap-[3vmin] pt-[2vmin]">
        <div className='w-full pl-[12vmin] pr-[12vmin] text-3xl flex justify-between font-["BBH_Sans_Bogle",_sans-serif]'>
          <h1>{lang == "en" ? "Edit Task" : "ტასკის რედაქტირება"}</h1>
          <h1>{user.username}</h1>
        </div>
        <div className="w-[100vmin] h-[75vh] bg-[url(./assets/Box-bg.svg)] flex flex-col justify-center items-center gap-[6.5vmin] relative">
          <div className="w-[55vmin] flex flex-col gap-[1vmin] relative">
            <label className="w-full text-2xl">{lang == "en" ? "Title Of Task" : "ტასკის სათაური"}</label>
            <input
              type="text"
              placeholder={lang == "en" ? "Enter Title Of The Task" : "მიუთითეთ ტასკის სათაური"}
              value={title}
              disabled={isEnabled.includes("title") ? false : true}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[55vmin] p-[1.3vmin] glow-border"
            />
            <div
              className="absolute right-[0.8vmin] bottom-[0.9vmin] w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-[50%] cursor-pointer border"
              onClick={() => setIsEnabled("title")}
            >
              <i className="text-[22px] bxr  bx-pencil"></i>
            </div>
          </div>
          {err.includes("title") && (
            <div
              className={`w-[50vmin] h-[3vh] absolute top-[24.5vmin] text-red-600 text-shadow-none`}
            >
              please enter title
            </div>
          )}
          <div className="w-[55vmin] flex flex-col gap-[1vmin] relative">
            <label className="w-full text-2xl">{lang == "en" ? "Descripition Of The Task" : "ტასკის აღწერა"}</label>
            <textarea
              className="w-[55vmin] h-[20vh] p-[1vmin] glow-border"
              value={desc}
              disabled={isEnabled.includes("desc") ? false : true}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={226}
            ></textarea>
            <div
              className="absolute right-[0.8vmin] bottom-[0.9vmin] w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-[50%] cursor-pointer border"
              onClick={() => setIsEnabled("desc")}
            >
              <i className="text-[22px] bxr  bx-pencil"></i>
            </div>
          </div>
          {err.includes("desc") && (
            <div
              className={`w-[50vmin] h-[3vh] absolute top-[54vmin] text-red-600 text-shadow-none`}
            >
              Please enter description
            </div>
          )}
          <div className="w-[55vmin] flex gap-[1.5vmin]">
            <div
              className={`w-[12vmin] text-center p-[0.5vmin] bg-[#b3b31b] text-[#1f1c1c] text-shadow-none font-medium cursor-pointer ${
                status === "To Do" && "glow-border"
              }`}
              onClick={() => setStatus("To Do")}
            >
              <h1 style={lang == "en" ? {fontSize: "16px"} : {fontSize: "14px"}}>{lang == "en" ? "To Do" : "გასაკეთებელი"}</h1>
            </div>

            <div
              className={`w-[13.5vmin] text-center p-[0.5vmin] bg-blue-300 text-shadow-none font-medium cursor-pointer ${
                status === "In Progress" && "glow-border"
              }`}
              onClick={() => setStatus("In Progress")}
            >
              <h1>{lang == "en" ? "In Progress" : "პროგრესში"}</h1>
            </div>

            <div
              className={`w-[12vmin] text-center p-[0.5vmin] bg-pink-500 text-shadow-none font-medium cursor-pointer ${
                status === "Done" && "glow-border"
              }`}
              onClick={() => setStatus("Done")}
            >
              <h1 style={lang == "en" ? {fontSize: "16px"} : {fontSize: "14px"}}>{lang == "en" ? "Done" : "დასრულებული"}</h1>
            </div>
          </div>

          <div className="w-[55vmin] flex gap-[1.5vmin]">
            <div
              className={`w-[12vmin] text-center p-[0.5vmin] text-shadow-none font-medium cursor-pointer border ${
                priority === "Low" && "glow-border"
              }`}
              onClick={() => setPriority("Low")}
            >
              <h1>{lang == "en" ? "Low" : "დაბალი"}</h1>
            </div>

            <div
              className={`w-[13.5vmin] text-center p-[0.5vmin] text-shadow-none font-medium cursor-pointer border ${
                priority === "Normal" && "glow-border"
              }`}
              onClick={() => setPriority("Normal")}
            >
              <h1>{lang == "en" ? "Normal" : "ნორმალური"}</h1>
            </div>

            <div
              className={`w-[12vmin] text-center p-[0.5vmin] text-shadow-none font-medium cursor-pointer border ${
                priority === "High" && "glow-border"
              }`}
              onClick={() => setPriority("High")}
            >
              <h1>{lang == "en" ? "High" : "მაღალი"}</h1>
            </div>
          </div>

          <div className="w-[4vmin] h-[4vmin] absolute right-0 top-0 text-[26px] flex justify-center items-center" onClick={() => {deleteTask(user._id, projectId, taskId)
            navigate(`/Task/${projectId}`)
          }}>
              <i className='text-[aqua] bxr  bx-trash'></i> 
          </div>
        </div>
        <div className="w-full flex justify-center gap-[20vmin]">
          <button
            className="w-[18vmin] p-[1.5vmin] border border-red-600 text-red-600 font-light rounded-[6px]  hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
            onClick={() => updateTask(user._id, taskId)}
          >
            {lang == "en" ? "Edit Task" : "ტასკის რედაქტირება"}
          </button>

          <button className="w-[18vmin] p-[1.5vmin] border border-blue-300 text-blue-300 font-light rounded-[6px] hover:border-amber-50 hover:text-amber-50 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
            onClick={() => navigate("/Projects")}
          >
            {lang == "en" ? "Cancel" : "გაუქმება"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditTask;
