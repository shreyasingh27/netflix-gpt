import React from "react";
import { CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return;
  return (
    <div className="w-40 md:w-48 pr-4">
      <img className="object-cover h-[100%]" src={CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
