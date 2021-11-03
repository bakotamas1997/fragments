import axios from "axios";
import { useState, useEffect } from "react";

import Project from "../Project/Project";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/projects/").then((response) => {
      setProjects(response.data.projects);
    });
  }, []);

  const onClickedProject = (id) => {
    console.log(id);
  };

  let displayProjects = projects.map((project) => {
    return (
      <Project
        name={project.name}
        description={project.description}
        key={project._id}
        onClick={() => onClickedProject(project._id)}
      />
    );
  });

  return (
    <div>
      <h2>Projects</h2>
      {displayProjects}
    </div>
  );
};

export default Projects;
