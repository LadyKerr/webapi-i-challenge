import React from "react";
import axios from "axios";
import UserList from "./UserList";
import UserForm from "./UserForm";
import NavBar from "./NavBar";
import { Route } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  state = {
    users: [],
    error: ""
  };

  //display users from server
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  addUser = newUser => {
    axios
      .post("http://localhost:5000/api/users", newUser)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route
          exact path="/"
          render={props => <UserList {...props} userData={this.state.users} />}
        />
        <Route
          path="/add-user"
          render={props => <UserForm {...props} addUser={this.addUser} />}
        />
      </div>
    );
  }
}

export default App;
