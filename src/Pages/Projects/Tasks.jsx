import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import useUserStore from "../../store/useUserStore";
import useProjectStore from "../../store/useProjectStore";
import Task from "../../Component/Task";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../PageStyle.css";

const Tasks = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { projects } = useProjectStore();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [todoTasks, setTodoTasks] = useState([]);
  const [inprogressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const [taskOptionOpen, setTaskOptionOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const project = projects.find((p) => p._id === projectId);
  const tasks = project.tasks;

  useEffect(() => {
    if (tasks?.length === 0) return navigate(`/AddTask/${projectId}`);

    const todo = tasks.filter((item) => item.status === "To Do") || [];
    const inProgress = tasks.filter((item) => item.status === "In Progress") || [];
    const done = tasks.filter((item) => item.status === "Done") || [];

    setTodoTasks(todo);
    setInProgressTasks(inProgress);
    setDoneTasks(done);
  }, [project.tasks]);

  // Columns object
  const columns = {
    "To Do": { tasks: todoTasks, setter: setTodoTasks },
    "In Progress": { tasks: inprogressTasks, setter: setInProgressTasks },
    Done: { tasks: doneTasks, setter: setDoneTasks },
  };

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;

    destCol.tasks.splice(destination.index, 0, movedTask);

    sourceCol.setter([...sourceCol.tasks]);
    destCol.setter([...destCol.tasks]);

    fetch(
      `${BASE_URL}/api/user/${user._id}/project/${projectId}/task/${movedTask._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: "status", value: movedTask.status }),
      }
    );
  };

  return (
    <main className="w-full h-auto pb-[14vmin]">
      <div className="w-full h-full pt-[4vmin]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="w-full h-[90vh] space-y-[2vmin]">
            {/* Column titles */}
            <div className="w-full flex justify-evenly">
              {Object.keys(columns).map((col) => (
                <div
                  key={col}
                  className="lg:w-[20%] w-[30%] text-center lg:text-2xl border text-pink-500"
                >
                  <h1>{col}</h1>
                </div>
              ))}
            </div>

            {/* Columns */}
            <div className="w-full h-[90%] flex justify-evenly">
              {Object.entries(columns).map(([colName, colData]) => (
                <Droppable droppableId={colName} key={colName}>
                  {(provided) => (
                    <div
                      className="lg:w-[20%] w-[32%] h-auto border-r border-l border-gray-400 flex flex-col items-center gap-[2vmin] relative"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {colData.tasks.map((item, index) => (
                        <Draggable
                          draggableId={item._id.toString()}
                          index={index}
                          key={item._id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="relative"
                            >
                              <Task
                                title={item.title}
                                desc={item.desc}
                                status={item.status}
                              />

                              {editMode && (
                                <div
                                  className="w-[3rem] h-[3rem] absolute right-0 bottom-0 bg-[#1C1F2B] flex justify-center items-center text-[21.5px] cursor-pointer"
                                  onClick={() =>
                                    navigate(`/EditTask/${projectId}/${item._id}`)
                                  }
                                >
                                  <i className="bxr bx-pencil"></i>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </DragDropContext>

        {/* Task Options Button */}
        {!taskOptionOpen && (
          <div
            className="w-[5vmin] pt-[2.8vmin] pb-[2.9vmin] absolute right-[-2vmin] bottom-[3vmin] text-3xl text-[#1d0f0f] bg-[#963434d2] flex rounded-2xl cursor-pointer"
            onClick={() => setTaskOptionOpen(true)}
          >
            <i className="bxr bx-caret-left"></i>
          </div>
        )}

        {taskOptionOpen && (
          <div className="taskOptions w-[20vmin] h-[5.5rem] absolute right-0 bottom-[0.5vmin] flex">
            <div
              className="w-[3vmin] h-[5.5rem] mr-[-0.5vmin] text-3xl text-[#1d0f0f] bg-[#963434d2] absolute right-[18.5vmin] bottom-[3vmin] flex items-center cursor-pointer"
              onClick={() => setTaskOptionOpen(false)}
            >
              <i className="bxr bx-caret-left"></i>
            </div>

            <div className="w-[18vmin] h-[5.5rem] absolute right-0 bottom-[3vmin] flex justify-evenly items-center bg-[#963434d2]">
              <div
                className="w-[3rem] h-[3rem] border rounded-[50%] flex justify-center items-center text-3xl cursor-pointer"
                onClick={() => setEditMode((prev) => !prev)}
              >
                <i className="bxr bx-pencil"></i>
              </div>

              <div
                className="w-[3rem] h-[3rem] border rounded-[50%] flex justify-center items-center text-4xl cursor-pointer"
                onClick={() => navigate(`/AddTask/${projectId}`)}
              >
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Tasks;
