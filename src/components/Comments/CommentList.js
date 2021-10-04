import CommentItem from "./CommentItem";
import classes from "./CommentList.module.css";

const CommentList = (props) => {
  const {comments} = props
  return (
    <div className={classes.commentList}>
      {comments.map((comment) => (
        <CommentItem text={comment.text} key={comment.id} commenter={comment.commenter}/>
      ))}
    </div>
  );
};
export default CommentList;
