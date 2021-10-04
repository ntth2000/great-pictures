import React, { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { useParams } from "react-router";

import { getUserData, getUserPictures } from "../lib/api";

import NoPictureFound from "../components/AllPictures/NoPictureFound";
import PictureList from "../components/AllPictures/PictureList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import UserInfor from "../components/Users/UserInfor";

const PersonalPage = (props) => {
  //userId to get pictures
  const params = useParams();
  const { userId } = params;

  //get picture request
  const {
    sendRequest: getPersonalRequest,
    data: loadedPictures,
    status:pictureStatus,
    error:pictureError,
  } = useHttp(getUserPictures, true);

  useEffect(() => {
    getPersonalRequest(userId);
  }, [getPersonalRequest, userId]);

  //get user data
  const { sendRequest: getUserRequest, data: loadedUserData, error: userDataError,status:userDataStatus } =
    useHttp(getUserData,true);

  useEffect(() => {
    getUserRequest(userId);
  }, [getUserRequest, userId]);

  if (pictureStatus === "pending" || userDataStatus ==='pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (pictureError || userDataError) {
    return <p className="centered">{pictureError} <br/> {userDataError}</p>;
  }

  if (
    pictureStatus === "completed" &&
    (!loadedPictures || loadedPictures.length === 0)
  ) {
    return <NoPictureFound />;
  }

  return (
    <React.Fragment>
      <UserInfor
        image={loadedUserData.profileImgURL}
        username={loadedUserData.username}
      />
      <PictureList pictures={loadedPictures} />
    </React.Fragment>
  );
};
export default PersonalPage;
