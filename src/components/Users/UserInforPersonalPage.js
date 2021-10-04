import { Link } from "react-router-dom";
import classes from "./UserInforPersonalPage.module.css";
const UserInforPersonalPage = (props) => {
  return (
    <div className={classes.UserInfor}>
      <Link to={`/${props.userId}`}>
        <img src={props.image} alt="profile" />{" "}
      </Link>
      <Link to={`/${props.userId}`}>
        <p>{props.username}</p>
      </Link>
    </div>
  );
};
export default UserInforPersonalPage;
