import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProjectStore from "../../store/useProjectStore";
import useUserStore from "../../store/useUserStore";

const BASE_URL = import.meta.env.VITE_API_URL;

const EditProject = () => {
  const { user } = useUserStore();
  const { projectId } = useParams();
  const { projects, setProjects } = useProjectStore();
  const navigate = useNavigate();

  const project = projects.find((p) => p._id === projectId);

  const [title, setTitle] = useState(project?.title || "");
  const [desc, setDesc] = useState(project?.desc || "");
  const [color, setColor] = useState(project?.color || "#000000");

  async function saveProject() {
    const res = await fetch(
      `${BASE_URL}/api/user/${user._id}/project/${projectId}`,
      {
        method: "PUT",
        body: JSON.stringify({ title, desc, color }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    setProjects(data);
    navigate("/Projects");
  }

  return (
    <div className="p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        className="border p-2 w-full mb-2"
      />

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full mb-2"
      ></textarea>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={saveProject}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Project
      </button>
    </div>
  );
};

export default EditProject;
