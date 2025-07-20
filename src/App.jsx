// App.js
import React, { useState } from 'react';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div >
      <h1>CRUD App with JWT Auth</h1>

      {!loggedIn ? (
        <>
          <Register />
          <Login onLogin={() => setLoggedIn(true)} />
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Dashboard loggedIn={loggedIn}  />
        </>
      )}
    </div>
  );
}

export default App;
