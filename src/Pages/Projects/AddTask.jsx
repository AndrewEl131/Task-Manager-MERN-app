import React from "react";
import Header from "../../Component/Header/Header";
import boxbg from "../../assets/Box-bg.svg";
import { useState } from "react";
import Task from "../../Component/Task";
import useTaskStore from "../../store/useTaskStore";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useLangStore from "../../store/useLangStore";

const AddTask = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { addTask } = useTaskStore();

  const { user } = useUserStore();
  const { lang } = useLangStore();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Normal");

  const [err, setErr] = useState("");

  return (
    <main className="w-full h-[100vh]">
      <div className="w-full h-[88vh] flex flex-col gap-2 items-center">
        <div className="w-full text-center text-4xl pt-3">
          {lang == "en" ? "You don't have any task, add it!" : "შენ არ გაქვს ტასკი, დაამატე ეს!"}
        </div>
        <div className="w-full flex justify-evenly">
          <div className="w-[70vmin] h-[75vh] bg-[url(./assets/Box-bg.svg)] flex flex-col items-center gap-[5vmin] pt-[3vmin]">
            <div className="w-[50vmin] flex flex-col gap-[1vmin]">
              <label className="w-full text-2xl">{lang == "en" ? "Title Of Task" : "ტასკის სათაური"}</label>
              <input
                type="text"
                placeholder={lang == "en" ? "Enter Title Of The Task" : "მიუთითეთ ტასკის სათაური"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[50vmin] p-[1.3vmin] glow-border"
              />
            </div>
            {err.includes("title") && (
              <div
                className={`w-[50vmin] h-[3vh] absolute top-[24.5vmin] text-red-600 text-shadow-none`}
              >
                please enter title
              </div>
            )}
            <div className="w-[50vmin] flex flex-col gap-[1vmin]">
              <label className="w-full text-2xl">{lang == "en" ? "Descripition Of The Task" : "ტასკის აღწერა"}</label>
              <textarea
                className="w-[50vmin] h-[20vh] p-[1vmin] glow-border"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                maxLength={226}
              ></textarea>
            </div>
            {err.includes("desc") && (
              <div
                className={`w-[50vmin] h-[3vh] absolute top-[54vmin] text-red-600 text-shadow-none`}
              >
                Please enter description
              </div>
            )}
            <div className="w-[50vmin] flex gap-[1.5vmin]">
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

            <div className="w-[50vmin] flex gap-[1.5vmin]">
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
          </div>

          <div className="w-[50vmin] h-[75vh] flex justify-center items-center">
            <Task title={title} desc={desc} status={status} />
          </div>
        </div>
        <div className="w-full h-[10vh] flex justify-evenly items-center">
          <button
            className="w-[17vmin] p-3 border border-red-600 text-red-600 font-light rounded-[6px]  hover:border-red-500 hover:text-red-500 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer"
            onClick={async () => {
              if (title.length === 0) return setErr("title");
              if (desc.length === 0) return setErr("desc");

              try {
                await addTask(
                  user._id,
                  title,
                  desc,
                  status,
                  priority,
                  projectId
                );

                navigate("/Projects");
              } catch (err) {
                console.error("Error adding task:", err);
              }
            }}
          >
            {lang == "en" ? "Add Task" : "ტასკის დამატება"}
          </button>
          <button className="w-[9rem] p-3 border border-blue-300 text-blue-300 font-light rounded-[6px] hover:border-amber-50 hover:text-amber-50 hover:bg-[#e4dcdc2a] transform transition-all duration-200 cursor-pointer">
            {lang == "en" ? "Learn More" : "გაიგე მეტი"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default AddTask;
