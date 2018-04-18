import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentDateTime from './CurrentDateTime';
import '../styling/NavBar.css';

function NavBar(props) {
  const { user, onSignOut = () => {} } = props;

  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  }

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      {
        user? (
          [
            <NavLink key="1" exact to={`/users/${user.first_name}`}>User Page</NavLink>,
            <span key="2">Hello, {user.first_name}</span>,
            <a key="3" fref="/sign_out" onClick={handleSignOut}>Sign Out</a>
          ]
        ) : (
          [ <NavLink exact to="/sign_in">Sign In</NavLink>,
            <NavLink exact to="/sign_up">Sign Up</NavLink>
          ]
        )}
      <CurrentDateTime />
    </nav>
  )
}

export default NavBar;