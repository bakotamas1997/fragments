const Story = (props) => {
  return (
    <li>
      <h3>{props.name}</h3>
      {props.status ? <p>{props.status.name}</p> : null}
      <p>{props.description}</p>
    </li>
  );
};

export default Story;
