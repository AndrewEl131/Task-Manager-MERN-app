import axios from "axios";

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_APP_URL}/api`,
        withCredentials: true,
    });

    return instance;
};

export const api = createAxiosInstance();