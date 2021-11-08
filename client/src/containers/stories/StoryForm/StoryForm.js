import Form from "../../../components/UI/Form/Form";
import { createStory } from "../../../store/actions";
import { useHistory } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/UI/Button/Button";

const StoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const error = useSelector((state) => state.story.error);
  const projectId = useSelector((state) => state.story.projectId);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const onSubmitHandler = () => {
    const story = {
      name: name,
      description: description,
    };
    dispatch(createStory(projectId, story, history));
  };

  return (
    <div>
      <Form form={formProps} />
      {error ? <p>{error}</p> : null}
      <Button onClickHandler={onSubmitHandler}>Submit</Button>
    </div>
  );
};

export default StoryForm;
