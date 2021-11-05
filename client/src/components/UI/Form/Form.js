import classes from "./Form.module.css";

const Form = (props) => {
  let formElements = props.form.map((elem) => {
    return (
      <input
        type={elem.type}
        value={elem.value}
        placeholder={elem.placeholder}
        onChange={(e) => elem.setValue(e.target.value)}
        key={elem.type + elem.placeholder}
        className={classes.Input}
      />
    );
  });

  return <div className={classes.Wrapper}>{formElements}</div>;
};

export default Form;
