import classes from "./UserInfor.module.css";
const UserInfor = (props) => {
  return (
    <div className={classes.UserInfor}>
      <img src={props.image} alt="profile" />
      <p>{props.username}</p>
    </div>
  );
};
export default UserInfor;
