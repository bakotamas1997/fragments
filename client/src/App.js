import "./App.css";
import { useDispatch } from "react-redux";
import { authCheck } from "./store/actions";
import { useEffect } from "react";
import { Route, Switch } from "react-router";
import Login from "./containers/auth/Login/Login";
import Register from "./containers/auth/Register/Register";
import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";
import axios from "axios";
import Projects from "./containers/projects/Projects/Projects";
import { Logout } from "./components/navigation/Logout/Logout";

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

  useEffect(() => {
    setAuthToken(localStorage.token);
    dispatch(authCheck(localStorage.email, localStorage.token));
  }, [dispatch]);

  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/projects" component={Projects} exact />
        <Route path="/logout" component={Logout} exact />
      </Switch>
    </div>
  );
}

export default App;
