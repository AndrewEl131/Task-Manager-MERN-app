import React from "react";
import useUserStore from "../../store/useUserStore";
import ExplorerSortField from "./ExplorerSortField";

const TaskExplorer = () => {
    const { user } = useUserStore();
  return (
    <div className="w-[15rem] h-auto bg-[#191c24] p-[1rem_0px_1rem_0px] flex flex-col gap-[1rem] text-shadow-none rounded-[8px]">
      <div className="w-full h-[1.5rem] text-[23px] text-center">
        <h1 className="uk-glow">{user.username}</h1>
      </div>

      <ExplorerSortField content={"Date"} />

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>Last week</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>Last month</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>Last year</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <ExplorerSortField content={"Quality"} />

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>New tasks</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>Old tasks</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <ExplorerSortField content={"Status"} />

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>To Do</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>In Progress</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>Done</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <ExplorerSortField content={"Priority"} />

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>Low</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>Normal</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] text-[18px] flex">
        <div className="w-[70%] flex justify-end items-center">
          <h1>High</h1>
        </div>
        <div className="w-[30%] flex justify-start">
          <span className="rotate-90 ml-2">&gt;</span>
        </div>
      </div>

      <div className="w-full h-[2.5rem] flex border-t pt-2">
        <div className="w-[70%] h-full flex pl-[4%]">
          <select className="text-white w-[70%] bg-[#191c24]" name="sort by">
            <option value="ByDate">By Date</option>
            <option value="ByQuality">By Quality</option>
            <option value="ByDate">By Status</option>
            <option value="ByDate">By Priority</option>
          </select>
          <div className="w-[20%] h-full flex justify-center items-center">
            <img
              src="https://zoommer.ge/icons/quick-btn-compare.svg"
              alt=""
              className="h-4"
            />
          </div>
        </div>

        <div className="w-[30%] h-full flex justify-end items-center pr-4">
          <span className="text-[20px] ml-2">&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default TaskExplorer;
