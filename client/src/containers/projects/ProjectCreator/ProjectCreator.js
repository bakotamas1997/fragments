import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { createProject } from "../../../store/actions";

const ProjectCreator = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector((state) => state.project.error);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = () => {
    dispatch(createProject(name, description, history));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Project name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      {error ? <p>{error}</p> : null}
      <button onClick={onSubmitHandler}>Submit</button>
    </div>
  );
};

export default ProjectCreator;
