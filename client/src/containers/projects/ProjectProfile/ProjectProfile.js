//Delete project, add user to project, modify project name and description
//1. Display

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import Spinner from "../../../components/UI/Spinner/Spinner";

const ProjectProfile = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedProject = useSelector((state) => state.project.selectedProject);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios.get("/api/projects/" + selectedProject).then((response) => {
      setName(response.data.name);
      setDescription(response.data.description);
      setLoading(false);
    });
  }, [selectedProject]);

  const updateProject = [
    {
      type: "text",
      value: name,
      placeholder: "Project name",
      setValue: setName,
    },
    {
      type: "textarea",
      value: description,
      placeholder: "Project description",
      setValue: setDescription,
    },
  ];

  const addUser = [
    {
      type: "email",
      value: user,
      placeholder: "Add user...",
      setValue: setUser,
    },
  ];

  const updateProjectHandler = () => {
    setLoading(true);
    axios
      .put("/api/projects/" + selectedProject, { name, description })
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setLoading(false);
      });
  };

  const addUserHandler = () => {
    setLoading(true);
    axios
      .put("/api/projects/" + selectedProject + "/" + user)
      .then(() => {
        setUser("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const deleteProjectHandler = () => {
    axios.delete("/api/projects" + selectedProject).then(() => {
      history.push("/projects");
    });
  };

  let elements = (
    <React.Fragment>
      <Form form={updateProject} />
      <Button onClickHandler={updateProjectHandler}>Update</Button>
      <Form form={addUser} />
      <Button onClickHandler={addUserHandler}>Add user</Button>
      <Button onClickHandler={deleteProjectHandler}>Delete</Button>
    </React.Fragment>
  );

  if (loading) {
    elements = <Spinner />;
  }

  return elements;
};

export default ProjectProfile;
