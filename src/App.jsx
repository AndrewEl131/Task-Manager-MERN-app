import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Task from "./Component/Task";
import Home from "./Pages/Home/Home";
import Rules from "./Pages/Rules/Rules";
import LogIn from "./Pages/LogIn/LogIn";

import Profile from "./Pages/Profile/Profile";
import Projects from "./Pages/Projects/Projects";
import EditTask from "./Pages/EditTask/EditTask";
import AddProject from "./Pages/Projects/AddProject";
import EditProject from "./Pages/EditProject/EditProject";
import Tasks from "./Pages/Projects/Tasks";
import AddTask from "./Pages/Projects/AddTask";
import HomeSweet from "./Pages/Home/HomeSweet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sweet" element={<HomeSweet />} />
        <Route path="/Rules" element={<Rules />} />
        <Route path="/Auth" element={<LogIn />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/AddProject" element={<AddProject />} />
        <Route path="/EditProject/:projectId" element={<EditProject />} />
        <Route path="/Task/:projectId" element={<Tasks />} />
        <Route path="/AddTask/:projectId" element={<AddTask />} />
        <Route path="/EditTask/:projectId/:taskId" element={<EditTask />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
