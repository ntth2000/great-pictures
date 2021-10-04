import React, { useContext, useRef, useState } from "react";
import { Prompt } from "react-router";

import classes from "./NewPictureForm.module.css";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import { AuthContext } from "../../auth-context/auth-context";
//using prompt to prevent unpossibly wanted route transitions
const NewPictureForm = (props) => {
  const authCtx = useContext(AuthContext);

  //get posted date
  var postedDate = new Date();

  //use state to check whether user is entering or not
  const [isEntering, setIsEntering] = useState(false);
  const imgInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAddPictureHandler({
      owner: authCtx.userId,
      image: imgInputRef.current.value,
      description: descriptionInputRef.current.value,
      date: postedDate,
    });
  };

  //use this function to prevent prompt when use finishes filling form and wants to add new picture
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };
  const formFocusedHandler = () => {
    setIsEntering(true);
  };
  return (
    <div className={classes.formContainer}>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <div className={classes.cardContainer}>
        <Card>
          <form
            className={classes.form}
            onSubmit={submitHandler}
            onFocus={formFocusedHandler}
          >
            {props.isLoading && (
              <div className={classes.loading}>
                <LoadingSpinner />
              </div>
            )}
            <div className={classes.control}>
              <label htmlFor="img">Image URL</label>
              <input type="text" id="img" ref={imgInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="description">Description</label>
              <input type="text" id="description" ref={descriptionInputRef} />
            </div>
            <div className={classes.actions}>
              <button className="btn" onClick={finishEnteringHandler}>
                Add Picture
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
export default NewPictureForm;
