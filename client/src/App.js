import "./App.css";
import { Route, Switch } from "react-router";
import Login from "./containers/auth/Login/Login";
import Register from "./containers/auth/Register/Register";
import NavigationBar from "./components/navigation/NavigationBar/NavigationBar";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </div>
  );
}

export default App;
