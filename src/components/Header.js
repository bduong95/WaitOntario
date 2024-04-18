import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import '../styles/Header.css';

const Header = ({ user }) => {
  const auth = useAuth(); // Get authentication context
  console.log(auth);

  const handleLogout = () => {
    auth.logout(); // Call the logout function
  };

  return (
    <header>
      <nav className="nav-left">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <nav className="nav-right">
        <ul>
          {/* Conditionally render user's email or login/signup links */}
          {auth.user ? (
            <>
              <li>Welcome {auth.user.firstname}</li> {/* Accessing user email here */}
              <li onClick={handleLogout} className="logout-text">( Logout )</li> {/* Make text clickable */}
            </>
          ) : (
            <>
              <li><Link to="/signin">Log In</Link></li>
              <li>/</li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
