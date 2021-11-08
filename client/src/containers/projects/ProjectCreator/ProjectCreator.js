import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { createProject } from "../../../store/actions";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";

const ProjectCreator = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((state) => state.project.error);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = () => {
    dispatch(createProject(name, description, history));
  };

  const formProps = [
    {
      type: "text",
      value: name,
      placeholder: "Project name",
      setValue: setName,
    },
    {
      type: "text",
      value: description,
      placeholder: "Project description",
      setValue: setDescription,
    },
  ];

  return (
    <div>
      <Form form={formProps} />
      {error ? <p>{error}</p> : null}
      <Button onClickHandler={onSubmitHandler}>Submit</Button>
    </div>
  );
};

export default ProjectCreator;
