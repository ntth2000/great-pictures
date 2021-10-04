import { Link } from "react-router-dom"
import classes from './NoPictureFound.module.css'

const NoPictureFound = props => {
    return (
        <div className={classes.noPictureFound}>
            <p>No picture found!</p>
            <Link to='/new-picture' className='btn'>
                Add New Picture
            </Link>
        </div>
    )
}
export default NoPictureFound