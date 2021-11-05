import { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getProjects } from "../../../store/actions";
import Project from "../Project/Project";
import Button from "../../../components/UI/Button/Button";

import classes from "./Projects.module.css";

const Projects = () => {
  const projects = useSelector((state) => state.project.projects);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const onClickedProject = (id) => {
    console.log(id);
  };

  let displayProjects = projects
    ? projects.map((project) => {
        return (
          <Project
            name={project.name}
            description={project.description}
            key={project._id}
            onClick={() => onClickedProject(project._id)}
          />
        );
      })
    : null;

  const addProjectHandler = () => {
    history.push("/createProject");
  };

  return (
    <div className={classes.ProjectContainer}>
      <h2>Projects</h2>
      <div className={classes.Projects}>{displayProjects}</div>
      <Button onClickHandler={addProjectHandler} style="regular">
        Add Project
      </Button>
    </div>
  );
};

export default Projects;
