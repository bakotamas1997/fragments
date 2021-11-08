import classes from "./Project.module.css";
import Button from "../../../components/UI/Button/Button";

const Project = (props) => {
  return (
    <div className={classes.Project}>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <Button onClickHandler={props.onStories}>STORIES</Button>
      <Button onClickHandler={props.onEdit}>EDIT</Button>
    </div>
  );
};

export default Project;
