import { create } from "zustand";
import useUserStore from "./useUserStore";
import useProjectStore from "./useProjectStore";

const useTaskStore = create((set, get) => ({
  tasks: [],
  error: "",

  getAllTask: async (userId, projectId) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}/tasks`,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) return set({ error: data.errorMessage });

    set({ tasks: data });
  },

  addTask: async (userId, title, desc, status, priority, projectId) => {
    const { setProjects, projects } = useProjectStore.getState();
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}/task`,
      {
        method: "POST",
        body: JSON.stringify({ title, desc, status, priority }),
        headers: { "Content-type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) return set({ error: data.errorMessage });

    setProjects(data);

    const updatedProject = data.find((p) => p._id === projectId);
    if (updatedProject) {
      set({ tasks: updatedProject.tasks });
    }
  },

  updateTask: async (
    userId,
    projectId,
    taskId,
    title,
    desc,
    status,
    priority
  ) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}/task/${taskId}`,
      {
        method: "PUT",
        body: JSON.stringify({ title, desc, status, priority }),
        headers: { "Content-type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) return set({ error: data.errorMessage });

    set({
      tasks: get().tasks.map((t) => (t._id === data._id ? data : t)),
    });
  },

  updatedTaskField: async (userId, projectId, field, value) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}/task`,
      {
        method: "PATCH",
        body: JSON.stringify({ field, value }),
        headers: { "Content-type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) return set({ error: data.errorMessage });

    set({
      tasks: get().tasks.map((t) => (t._id === data._id ? data : t)),
    });
  },

 deleteTask: async (userId, projectId, taskId) => {
  const { setProjects } = useProjectStore.getState();

  const res = await fetch(
    `http://localhost:3000/api/user/${userId}/project/${projectId}/task/${taskId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return set({ error: data.errorMessage });
  }

  setProjects(data);

  const updatedProject = data.find((p) => p._id === projectId);
  if (updatedProject) {
    set({ tasks: updatedProject.tasks });
  }
},

}));

export default useTaskStore;
