import "./App.css";
import Landing from "./Components/Layout/Landing";
import Navbar from "./Components/Layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

import { useEffect } from "react";

// Redux Bring in
import { Provider } from "react-redux";
import store from "./Store";
import Alert from "./Components/Layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "../src/Actions/auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import CreateProfile from "./Components/Profile-Form/CreateProfile";
import EditProfile from "./Components/Profile-Form/EditProfile";
import AddExperience from "./Components/Profile-Form/AddExperience";
import AddEducation from "./Components/Profile-Form/AddEducation";
import Profile from "./Components/Profiles/Profiles";
import ParticularProf from "./Components/ParticularProfile/Profile";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/:id" component={ParticularProf} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              path="/add-education"
              exact
              component={AddEducation}
            />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
