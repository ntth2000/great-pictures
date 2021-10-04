import { Link } from "react-router-dom";
import classes from "./PictureItem.module.css";

const PictureItem = (props) => {
  return (
    <div className={classes.item}>
      <Link to={`/pictures/${props.id}`}><img src={props.img} alt={props.id} /></Link>
    </div>
  );
};

export default PictureItem;
