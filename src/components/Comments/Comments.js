import { useParams } from "react-router";
import { useEffect, useCallback } from "react";
import classes from "./Comments.module.css";

import { getAllComments } from "../../lib/api";
import useHttp from "../../hooks/use-http";

import NewCommentForm from "./NewCommentForm";
import CommentList from "./CommentList";

import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = (props) => {
  const params = useParams();
  const { pictureId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  
  useEffect(() => {
    sendRequest(pictureId);
  }, [sendRequest, pictureId]);

  const addedCommentHandler = useCallback(() => {
    sendRequest(pictureId);
  }, [sendRequest, pictureId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
   
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No Comments Were Added Yet!</p>;
  }
  
  return (
    <div className={classes.comments}>
      <h2>Comments</h2>
      <NewCommentForm
        pictureId={pictureId}
        onAddComment={addedCommentHandler}
      />
      {comments}
    </div>
  );
};
export default Comments;
