import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/trailer_park.png';
import background_banner from '../../assets/background_banner.jpg';
import { login, signup } from '../../firebase';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user_auth = async (e) => {
    e.preventDefault();
    try {
      if (signState === "Sign Up") {
        await signup(name, email, password);
        alert("Signup successful!");
      } else {
        await login(email, password);
        alert("Login successful!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleSignState = () => {
    setSignState(prev => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };

  return (
    <div
      className='login'
      style={{
        backgroundImage: `linear-gradient(#0000007e, #0000007e), url(${background_banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img src={logo} alt="TrailerPark Logo" className='login-logo' />

      <div className='login-form'>
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Your name'
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          <button type='submit'>{signState}</button>

          <div className='form-help'>
            <div className='remember'>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p className='login-help'>Need help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to TrailerPark?{' '}
              <span onClick={toggleSignState} style={{ cursor: 'pointer', color: '#e50914' }}>
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={toggleSignState} style={{ cursor: 'pointer', color: '#e50914' }}>
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
