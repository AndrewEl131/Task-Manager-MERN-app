import { create } from "zustand";
import useUserStore from "./useUserStore";

const BASE_URL = import.meta.env.VITE_API_URL;

const useProjectStore = create((set, get) => ({
  projects: [],
  error: "",

  setProjects: (data) => {
    set({ projects: data });
  },

  getAllProjects: async (userId) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/projects`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) return set({ error: data.errorMessage });

    set({ projects: data });
  },

  addProject: async (userId, title, desc, color) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/project`, {
      method: "POST",
      body: JSON.stringify({ title, desc, color }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) return set({ error: data.errorMessage });

    set({ projects: data });
  },

  editProject: async (userId, projectId, title, desc, color) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/project/${projectId}`, {
      method: "POST",
      body: JSON.stringify({ title, desc, color }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) return set({ error: data.errorMessage });

    set({ projects: data });
  },

  updateProjectField: async (userId, projectId, field, value) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/project/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ field, value }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) return set({ error: data.errorMessage });

    set({ projects: data });
  },

  deleteProject: async (userId, projectId) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/project/${projectId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) return set({ error: data.errorMessage });

    set((state) => ({
      projects: state.projects.filter((p) => p._id !== projectId),
    }));

    const userStore = useUserStore.getState();
    userStore.setUser({
      ...userStore.user,
      projects: userStore.user.projects.filter((p) => p._id !== projectId),
    });
  },
}));

export default useProjectStore;
