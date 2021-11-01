import "./App.css";
import { Route, Switch } from "react-router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register/Register";
import NavigationBar from "./components/navigation/NavigationBar";

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
