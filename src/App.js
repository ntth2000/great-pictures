import React, { Suspense, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { AuthContext } from "./auth-context/auth-context";
import Layout from "./components/Layout/Layout";
import Welcome from "./components/Layout/Welcome";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AllPictures from "./pages/AllPictures";
import Login from "./pages/Login";
import PersonalPage from "./pages/PersonalPage";

//use react.lazy to faster loading time
//doesn't load unnecessary components
const NewPicture = React.lazy(() => import("./pages/NewPicture"));
const PictureDetail = React.lazy(() => import("./pages/PictureDetail"));
export const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY
function App() {
  const authCtx = useContext(AuthContext);
  return (
      <Switch>
        <Route path="/" exact>
          <Welcome />
        </Route>
        <Layout>
          <Suspense
            fallback={
              <div className="centered">
                <LoadingSpinner />
              </div>
            }
          >
            <Switch>
              {authCtx.isLoggedIn && (
                <Route exact path="/pictures">
                  <AllPictures />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/new-picture">
                  <NewPicture />
                </Route>
              )}
              {authCtx.isLoggedIn && (
                <Route path="/pictures/:pictureId">
                  <PictureDetail />
                </Route>
              )}
              <Route path="/login">
                <Login />
              </Route>
              {authCtx.isLoggedIn && (
                <Route path="/:userId">
                  <PersonalPage />
                </Route>
              )}
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </Switch>
  );
}

export default App;
