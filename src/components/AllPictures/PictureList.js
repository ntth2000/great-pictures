import classes from './PictureList.module.css'
import PictureItem from "./PictureItem";

const PictureList = (props) => {

  const pictureList = props.pictures.map((picture) => (
    <PictureItem
      key={picture.id}
      id={picture.id}
      img={picture.image}
      description={picture.description}
      owner = {picture.owner}
    />
  ));
  return <ul className={classes.pictureList}>{pictureList}</ul>;
};

export default PictureList;
