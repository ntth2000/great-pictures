import { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../auth-context/auth-context";
import useHttp from "../../hooks/use-http";
import { getUserData } from "../../lib/api";
import classes from "./Header.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
const Header = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  //get picture owner data
  const {
    sendRequest: getUserRequest,
    data: loadedUserData,
    error: userDataError,
    status: userDataStatus,
  } = useHttp(getUserData, true);

  useEffect(() => {
    if (userId && authCtx.isLoggedIn) {
      getUserRequest(userId);
    }
  }, [getUserRequest, userId]);

  if (authCtx.isLoggedIn) {
    if (userDataStatus === "pending") {
      return (
        <div className="centered">
          <LoadingSpinner />
        </div>
      );
    }
    if (userDataError) {
      return <p className="centered">{userDataError}</p>;
    }
  }

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <section className={classes.headerContainer}>
      <div className={classes.header}>
        <h2 className={classes.logo}>
          Great
          <br />
          Pictures
        </h2>
        <nav className={classes.nav}>
          <ul>
            {authCtx.isLoggedIn && (
              <li>
                <Link to="/pictures">
                  <i class="bx bxs-home"></i>
                </Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <Link to="/new-picture">
                  <i class="bx bx-plus-circle"></i>
                </Link>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <Link to={`/${authCtx.userId}`}>
                  <img
                    src={loadedUserData.profileImgURL}
                    alt="header-profile"
                  />
                </Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
};
export default Header;
