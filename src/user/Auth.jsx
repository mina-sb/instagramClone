import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import localStorageHandler from "../LocalStorageHandler";
import { useUser } from "../userContext";
import "./Auth.css";


const Auth = () => {
  const [ username, setUsername ] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ isLoginMode, setIsLoginMode ] = useState(true);
  const { username: contextUsername , setUser } = useUser();
  const navigate = useNavigate();
  const [ touched, setTouched ] = useState(false);
   const [alert, setAlert] = useState(false);


  let storedUser;

  useEffect(() => {
   const retrievedData = localStorageHandler.getItem("user");
   if (retrievedData && retrievedData.userInfo.username) {
     setUser(retrievedData.userInfo.username);
     navigate("/posts");
   }
 }, []);


  const switchModeHandler = () => {
    setIsLoginMode(!isLoginMode);
    isLoginMode && setAlert(false)
  }

  const authHandler = (e) => {
     e.preventDefault();
    if(isLoginMode) {
      if(password && email) {
        setTouched(false);
        const retrievedData = localStorageHandler.getItem("user");
        if(retrievedData && retrievedData.userInfo.email === email && retrievedData.userInfo.password === password) {
           setUser(retrievedData.userInfo.username);
           navigate("/posts"); 
        }
        else {
          setAlert(true)
        }
      } else {
        setTouched(true);
      }
      
    } else {      
      if(username && password && email) {
        localStorageHandler.clearItem();
        const user = {
          userInfo: {
            username: username,
            email: email,
            password: password,
          }
        }
        localStorageHandler.setItem("user", user);
        const retrievedData = localStorageHandler.getItem("user");
        setUser(retrievedData.userInfo.username);
        navigate('/posts'); 
      }
      else {
         setTouched(true);
      }
    }
  }
 
  
  return (
    <React.Fragment>
      <div className="auth-container myDiv">
        <h2 className="auth-container-title">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        <form>
          {!isLoginMode ? (
            <input
              type="text"
              id="username"
              placeholder="Name"
              className={`input ${
                touched && !username ? "input-required" : ""
              }`}
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
            className={`input ${touched && !email ? "input-required" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={`input ${touched && !password ? "input-required" : ""}`}
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
        {alert ? <span className="alert">You have to signup first!</span> : ""}
      </div>
    </React.Fragment>
  );
}

export default Auth