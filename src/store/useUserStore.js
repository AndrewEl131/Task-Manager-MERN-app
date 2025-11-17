import { create } from "zustand";

const BASE_URL = import.meta.env.VITE_API_URL;

const useUserStore = create((set, get) => ({
  user: {},
  error: "",

  setUser: (data) => set({ user: data }),

  register: async (username, password, rePassword) => {
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify({ username, password, rePassword }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.errorMessage);
        return set({ error: data.errorMessage });
      }

      set({ user: data, error: "" });
      console.log("Registered:", data);
    } catch (error) {
      set({ error: "Network or server error" });
    }
  },

  logIn: async (username, password) => {
    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.errorMessage);
        set({ error: data.errorMessage });
        return false;
      }

      set({ user: data, error: "" });
      return true;
    } catch (error) {
      set({ error: "Network or server error" });
    }
  },

  logOut: () => {
    set({ user: {}, error: "" });
  },

  setError: (errorMessage) => {
    set({ error: errorMessage });
  },

  changePassword: async (oldPassword, newPassword) => {
    const { user } = get();

    if (!user._id) {
      set({ error: "User not logged in" });
      return false;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/user/${user._id}`, {
        method: "POST",
        body: JSON.stringify({ oldPassword, newPassword }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.errorMessage);
        set({ error: data.errorMessage });
        return false;
      }

      set({ user: data, error: "" });
      return true;
    } catch (error) {
      set({ error: "Network or server error" });
      return false;
    }
  },

  updateUserField: async (field, value) => {
    const { user } = get();

    try {
      const res = await fetch(`${BASE_URL}/api/user/${user._id}`, {
        method: "PATCH",
        body: JSON.stringify({ field, value }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.errorMessage);
        return set({ error: data.errorMessage });
      }

      set({ user: data, error: "" });
    } catch (err) {
      console.error(err);
      set({ error: "Network error while updating user" });
    }
  },
}));

export default useUserStore;
