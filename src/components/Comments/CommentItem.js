import classes from "./CommentItem.module.css";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getUserData } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Link } from "react-router-dom";
const CommentItem = (props) => {
  const { commenter, text } = props;
  const {
    sendRequest: getUserRequest,
    data: loadedUserData,
    error: userDataError,
    status: userDataStatus,
  } = useHttp(getUserData, true);

  useEffect(() => {
    if (commenter) {
      getUserRequest(commenter);
    }
  }, [getUserRequest, commenter]);


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
  if (userDataStatus === "completed") {
    return (
      <div className={classes.commentItem}>
        <Link className={classes.username} to={`/${loadedUserData.id}`}>
           {loadedUserData.username}: </Link>
        <span>{text}</span>
      </div>
    );
  }
};
export default CommentItem;
