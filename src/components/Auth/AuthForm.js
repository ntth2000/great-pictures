import { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth-context/auth-context";
//import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import useHttp from "../../hooks/use-http";
import { login, register } from "../../lib/api";

const AuthForm = () => {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  //check user wants to log in or sign up
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredProfileImgURL, setEnteredProfileImgURL] = useState("");

  //request to store new user to database
  const { sendRequest } = useHttp(register);
  const { sendRequest: loginRequest, data: userId } = useHttp(login);
  
  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  };
  const profileImgChangeHandler = (e) => {
    setEnteredProfileImgURL(e.target.value);
  };

  useEffect(() => {
    loginRequest(enteredEmail);
  }, [enteredEmail, loginRequest]);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url;
    if (!isLogin) {
      //url for signing up
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwsdVEx1Rtk-zsDMQru0C36f-qPMzAdyw";
    } else {
      //url for signing in
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwsdVEx1Rtk-zsDMQru0C36f-qPMzAdyw";
    }
    //fetch data from firebase
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //if errors exist, return error
        if (data && data.error && data.error.message) {
          throw new Error(data.error.message);
        }
        if (isLogin) {
          //after login
          authCtx.login(data.idToken, userId);
          //redirect to /pictures
          history.replace("/pictures");
        } else {
          //store userData in database
          sendRequest({
            email: enteredEmail,
            username: enteredUsername,
            profileImgURL: enteredProfileImgURL,
          });
          setIsLogin(true);
        }
      })
      .catch((error) => console.log(error.message));
    setIsLoading(false);
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredUsername("");
  };
  return (
    <section className={classes.auth} onSubmit={submitHandler}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="profileImg">Profile Image URL</label>
            <input
              type="text"
              id="profileImg"
              required
              onChange={profileImgChangeHandler}
              value={enteredProfileImgURL}
            />
          </div>
        )}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              required
              onChange={usernameChangeHandler}
              value={enteredUsername}
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={emailChangeHandler}
            value={enteredEmail}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={passwordChangeHandler}
            value={enteredPassword}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p className="centered">Loading...</p>}
          {!isLogin&&<p className={classes.policy}>By signing up, you agree to our Terms , Data Policy and Cookies Policy</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
