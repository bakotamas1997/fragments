import classes from "./Project.module.css";

const Project = ({ name, description, onClick }) => {
  return (
    <div onClick={onClick} className={classes.Project}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Project;
