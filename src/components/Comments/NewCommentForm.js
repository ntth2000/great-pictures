import { useContext, useState } from "react";
import classes from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import { AuthContext } from "../../auth-context/auth-context";

const NewCommentForm = (props) => {
  const authCtx = useContext(AuthContext);
  const { sendRequest } = useHttp(addComment);

  const [commentInput, setCommentInput] = useState();

  const commentInputHandler = (e) => {
    setCommentInput(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    sendRequest({
      pictureId: props.pictureId,
      content: { commentData: commentInput, commenter: authCtx.userId },
    });
    setCommentInput("");
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows="5"
          value={commentInput}
          onChange={commentInputHandler}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};
export default NewCommentForm;
