import classes from "./Project.module.css";
import Button from "../../../components/UI/Button/Button";

const Project = (props) => {
  return (
    <div onClick={props.onClick} className={classes.Project}>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <Button onClickHandler={props.onDelete}>DELETE</Button>
    </div>
  );
};

export default Project;
