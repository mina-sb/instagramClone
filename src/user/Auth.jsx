import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./Auth.css";


const Auth = () => {
  const [ username, setUsername ] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ isLoginMode, setIsLoginMode ] = useState(true);
  const navigate = useNavigate();

  const switchModeHandler = () => {
   setIsLoginMode(!isLoginMode)
  }
  const authHandler = () => {
    const user = {
      userInfo: {
        username: username,
        email: email,
        password : password
      }
    }
    localStorage.setItem("user", JSON.stringify(user));
    navigate('/posts');
  }
  return (
    <React.Fragment>
      <div className="auth-container">
        <h2 className="auth-container-title">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        <form>
          {!isLoginMode ? (
            <input
              type="text"
              id="username"
              placeholder="Name"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            ""
          )}
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="full-width-button main-color-button button"
            onClick={authHandler}
          >
            {isLoginMode ? "Login" : "Join Now"}
          </button>
        </form>
        <button
          className="bg-color-button full-width-button button"
          onClick={switchModeHandler}
        >
          <p className="link-to-signup-p">
            {isLoginMode
              ? "Don’t have an account?"
              : "Do you have an account already?"}
            <span className="main-color-text">
              {isLoginMode ? "Register now" : "Login now"}
            </span>
          </p>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Auth