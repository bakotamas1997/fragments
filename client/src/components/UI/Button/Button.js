import classes from "./Button.module.css";

const Button = (props) => {
  let selectedClass = "";

  switch (props.style) {
    case "regular": {
      selectedClass = classes.Regular;
      break;
    }
    case "danger": {
      selectedClass = classes.Danger;
      break;
    }
    case "success": {
      selectedClass = classes.Success;
      break;
    }
    default:
      selectedClass = classes.Regular;
  }

  return (
    <button onClick={props.onClickHandler} className={selectedClass}>
      {props.children}
    </button>
  );
};

export default Button;
