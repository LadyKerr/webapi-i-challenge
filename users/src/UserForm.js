import React from "react";

class UserForm extends React.Component {
  state = {
    name: "",
    bio: ""
  };

  addNewUser = e => {
    e.preventDefault();
    this.props.addUser(this.state);
    this.setState({
      name: "",
      bio: ""
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1> Let's Add a New User! </h1>
        <form onSubmit={this.addNewUser}>
          <input
            onChange={this.handleInputChange}
            name="name"
            value={this.state.name}
            placeholder="please enter name"
          />
          <input
            onChange={this.handleInputChange}
            name="bio"
            value={this.state.bio}
            placeholder="please enter bio"
          />
          <button type="submit"> Add User </button>
        </form>
      </div>
    );
  }
}

export default UserForm;
