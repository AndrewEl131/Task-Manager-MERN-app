import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import CustomOutlet from "./Component/CustomOutlet";
import SafeRoute from "./Component/SafeRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Auth" element={<LogIn />} />

        <Route element={<CustomOutlet />}>
          <Route path="/" element={<Home />} />
          <Route path="/Rules" element={<Rules />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AddProject" element={<AddProject />} />
          <Route path="/EditProject/:projectId" element={<EditProject />} />
          <Route path="/Task/:projectId" element={<Tasks />} />
          <Route path="/AddTask/:projectId" element={<AddTask />} />
          <Route path="/EditTask/:projectId/:taskId" element={<EditTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
