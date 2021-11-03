const Project = ({ name, description, onClick }) => {
  return (
    <div onClick={onClick}>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

export default Project;
