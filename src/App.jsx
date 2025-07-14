import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './pages/Login/Login.jsx';
import Player from './pages/Player/Player.jsx';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUser(user);
        if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        console.log("User logged out");
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <div>
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
