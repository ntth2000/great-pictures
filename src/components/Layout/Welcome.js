import classes from "./Welcome.module.css";

import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../auth-context/auth-context";
const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div className={classes.welcome}>
      <section className={classes.header}>
        <h1 className={classes.logo}>Great<br/>Pictures</h1>
        <nav className={classes.nav}>
          <ul>
            {authCtx.isLoggedIn && (
              <li>
                <NavLink to="/pictures" activeClassName={classes.active}>
                  All Pictures
                </NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <NavLink to="/new-picture" activeClassName={classes.active}>
                  Add New Picture
                </NavLink>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li>
                <NavLink to="/login" activeClassName={classes.active}>
                  Login
                </NavLink>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <button onClick={logoutHandler} className={classes.welcomeButton}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </section>
      <section className={classes.body}>
        <h1>Share your best moments</h1>
      </section>
      <section className={classes.footer}>
        <p>&copy; 2021 GreatPictures</p>
      </section>
    </div>
  );
};
export default Welcome;
