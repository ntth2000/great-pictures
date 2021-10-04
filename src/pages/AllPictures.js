import { useEffect } from "react";

import useHttp from "../hooks/use-http";
import { getAllPictures } from "../lib/api";

import PictureList from "../components/AllPictures/PictureList";
import NoPictureFound from "../components/AllPictures/NoPictureFound";

import LoadingSpinner from "../components/UI/LoadingSpinner";

const AllPictures = (props) => {
  const {
    sendRequest,
    data: loadedPictures,
    status,
    error,
  } = useHttp(getAllPictures, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedPictures || loadedPictures.length === 0)
  ) {
    return <NoPictureFound />;
  }

  return (
    <div>
      <PictureList pictures={loadedPictures} />
    </div>
  );
};

export default AllPictures;
