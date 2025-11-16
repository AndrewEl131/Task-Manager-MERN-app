import { create } from "zustand";
import useUserStore from "./useUserStore";

const useProjectStore = create((set, get) => ({
  projects: [],
  error: "",

  setProjects: async (data) => {
    set({ projects: data });
  },

  getAllProjects: async (userId) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/projects`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) return set({ error: data.errorMessage });

    set({ projects: data });
  },

  addProject: async (userId, title, desc, color) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project`,
      {
        method: "POST",
        body: JSON.stringify({ title, desc, color }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return set({ error: data.errorMessage }, console.log(data.errorMessage));
    }

    set({ projects: data });
  },

  editProject: async (userId, projectId, title, desc, color) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}`,
      {
        method: "POST",
        body: JSON.stringify({ title, desc, color }),
        headers: { "Content-Type": "application/json" },
      }
    );

     const data = await res.json();

    if (!res.ok) {
      return set({ error: data.errorMessage }, console.log(data.errorMessage));
    }

    set({ projects: data });
  },

  updateProjectField: async (userId, projectId, field, value) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ field, value }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return set({ error: data.errorMessage }, console.log(data.errorMessage));
    }

    set({ projects: data });
  },

  deleteProject: async (userId, projectId) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${userId}/project/${projectId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data.errorMessage);
      return set({ error: data.errorMessage });
    }

    set((state) => ({
      projects: state.projects.filter((project) => project._id !== projectId),
    }));

    const userStore = useUserStore.getState();
    userStore.setUser({
      ...userStore.user,
      projects: userStore.user.projects.filter((p) => p._id !== projectId),
    });
  },
}));

export default useProjectStore;
