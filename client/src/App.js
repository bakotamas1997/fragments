import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./store/actions";
import { useEffect } from "react";
import { Route, Switch } from "react-router";
import Login from "./containers/auth/Login/Login";
import Register from "./containers/auth/Register/Register";
import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import ProjectCreator from "./containers/projects/ProjectCreator/ProjectCreator";
import Dashboard from "./containers/stories/Dashboard";
import axios from "axios";
import Projects from "./containers/projects/Projects/Projects";
import { Logout } from "./components/navigation/Logout/Logout";
import StoryForm from "./containers/stories/StoryForm/StoryForm";
import ProjectProfile from "./containers/projects/ProjectProfile/ProjectProfile";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-access-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-access-token"];
  }
};

setAuthToken(localStorage.token);

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setAuthToken(localStorage.token);
    dispatch(authCheck(localStorage.email, localStorage.token));
  }, [dispatch, token]);

  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/projects" component={Projects} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/createProject" component={ProjectCreator} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/createStory" component={StoryForm} />
        <Route path="/editProject" component={ProjectProfile} />
      </Switch>
    </div>
  );
}

export default App;
