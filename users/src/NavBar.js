import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav>
        <NavLink exact to="/">
          User List
        </NavLink>
        <NavLink exact to="/add-user">
          Add User
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
