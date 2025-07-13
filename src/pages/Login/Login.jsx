import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import background_banner from '../../assets/background_banner.jpg';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");

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
      <img src={logo} alt="Netflix Logo" className='login-logo' />

      <div className='login-form'>
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input type="text" placeholder='Name' required />
          )}
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
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
              New to Netflix?{' '}
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
