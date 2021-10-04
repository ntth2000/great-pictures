import { Route, useParams, useRouteMatch } from "react-router";

import { Link } from "react-router-dom";
import { useEffect } from "react";

import classes from "./PictureDetailPage.module.css";

import HighlightedPicture from "../AllPictures/HighlightedPicture";
import Comments from "../Comments/Comments";
import LoadingSpinner from "../UI/LoadingSpinner";
import UserInfor from "../Users/UserInfor";

import useHttp from "../../hooks/use-http";
import { getSinglePicture, getUserData } from "../../lib/api";
import UserInforPersonalPage from "../Users/UserInforPersonalPage";
const PictureDetailPage = (props) => {
  const {
    sendRequest: pictureRequest,
    status: pictureStatus,
    data: foundPicture,
    error: pictureError,
  } = useHttp(getSinglePicture, true);

  const match = useRouteMatch();
  const params = useParams();

  const { pictureId } = params;

  useEffect(() => {
    pictureRequest(pictureId);
  }, [pictureRequest, pictureId]);

  //get picture owner data
  const {
    sendRequest: getUserRequest,
    data: loadedUserData,
    error: userDataError,
    status: userDataStatus,
  } = useHttp(getUserData, true);

  useEffect(() => {
    if (foundPicture && foundPicture.owner) {
      getUserRequest(foundPicture.owner);
    }
  }, [getUserRequest, foundPicture]);
  if (pictureStatus === "pending" || userDataStatus === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (pictureError || userDataError) {
    return (
      <p className="centered">
        {pictureError} <br /> {userDataError}
      </p>
    );
  }
  if (!foundPicture.image) {
    return <p>No Picture Found!</p>;
  }

  return (
    <div className={classes.pictureDetailPage}>
      <div className={classes.container}>
        <UserInforPersonalPage
          image={loadedUserData.profileImgURL}
          username={loadedUserData.username}
          userId={loadedUserData.id}
        />
        <HighlightedPicture
          img={foundPicture.image}
          description={foundPicture.description}
          id={foundPicture.id}
        />
        <div className="centered">
          <Route exact path={`${match.url}`}>
            <Link className="btn--flat" to={`${match.url}/comments`}>
              Comment
            </Link>
          </Route>
        </div>
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </div>
    </div>
  );
};
export default PictureDetailPage;
