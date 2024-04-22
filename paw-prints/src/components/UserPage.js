import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObject = JSON.parse(storedUser);
        setUser(userObject);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
        localStorage.removeItem('user');
        navigate('/signin'); // Redirect to the sign-in page if there's an error
      }
    } else {
      navigate('/signin'); // Redirect to the sign-in page if user data is not available
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin'); // Redirect to the sign-in page after logging out
  };

  return (
    <div>
      <h1>Welcome, {user?.username || ''}!</h1>
      {/* User content */}
      <p>This is your user page.</p>

      {/* user information */}
      <h2>User Information</h2>
      <p>Username: {user?.username || ''}</p>
      <p>Email: {user?.email || ''}</p>

      {/* Log out */}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserPage;