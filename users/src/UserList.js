import React from "react";

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello from UserList!</h1>
        {this.props.userData.map(user => (
          <div>
            <h2> {user.name} </h2>
            <h3> {user.bio} </h3>
          </div>
        ))}
      </div>
    );
  }
}

export default UserList;
