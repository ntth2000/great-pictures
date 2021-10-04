import { useEffect } from "react";
import { useHistory } from "react-router";

import NewPictureForm from "../components/AllPictures/NewPictureForm";

import { addPicture } from "../lib/api";
import useHttp from "../hooks/use-http";

const NewPicture = (props) => {
  const { sendRequest, status } = useHttp(addPicture);

  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/pictures");
    }
  }, [history, status]);

  const addPictureHandler = (newImage) => {
    sendRequest(newImage);
  };

  return (
    <NewPictureForm
      onAddPictureHandler={addPictureHandler}
      isLoading={status === "pending"}
    />
  );
};
export default NewPicture;
