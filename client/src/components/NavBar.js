import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import '../styling/NavBar.css';

class NavBar extends Component {
  constructor(props){
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(event) {
    event.preventDefault();
    const { onSignOut = () => {} } = this.props;
    onSignOut();
  }

  render(){
    const {user} = this.props;
    // console.log('user in navBar render:',user);
    let parentUser;
    if (user) {
    parentUser = ( user.role === 'parent' ) ? (
        <NavLink exact to={`/users/parent`}>Parent Page</NavLink>
    ) : (
        <NavLink exact to={`/users/${user.first_name}`}>User Page</NavLink>
    )
    }
     // console.log('parentUser:', parentUser);
    return (
      <nav className="NavBar">
        <div className="textNav">Math For Kids</div>
        <div className="wrapperNav">
        <div className="keys">
          <div><NavLink exact to="/">Home</NavLink></div>
        {
          user? (
            [
              <div key="1">{parentUser}</div>,
              <div key="2" className="hello">Hello, {user.first_name}</div>,
              <div key="3">
              <a fref="/sign_out" onClick={this.handleSignOut}>Sign Out</a>
              </div>
            ]
          ) : (
            [
              <div key="1"><NavLink exact to="/sign_in">Sign In</NavLink></div>,
              <div key="2"><NavLink exact to="/sign_up">Sign Up</NavLink></div>
            ]
          )}
        </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
