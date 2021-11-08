import { useSelector } from "react-redux";
import Story from "./Story/Story";
import Button from "../../components/UI/Button/Button";
import { useHistory } from "react-router";

const Dashboard = () => {
  const stories = useSelector((state) => state.story.stories);
  const history = useHistory();

  const clickHandler = () => {
    history.push("/createStory");
  };

  let renderStories = null;
  if (stories) {
    renderStories = stories.map((story) => {
      let name = story.status || undefined;
      return (
        <Story
          name={story.name}
          description={story.description}
          status={name}
        />
      );
    });
  }

  return (
    <div>
      <ul>{renderStories}</ul>
      <Button onClickHandler={clickHandler}>Add story</Button>
    </div>
  );
};

export default Dashboard;
