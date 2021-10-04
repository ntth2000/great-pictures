import classes from './HighlightedPicture.module.css'

const HighlightedPicture = props => {
    const {img,id,description} = props
    return (
        <div className={classes.item}>
            <img src={img} alt={id}/>
            <p>{description}</p>
        </div>
    )
}
export default HighlightedPicture