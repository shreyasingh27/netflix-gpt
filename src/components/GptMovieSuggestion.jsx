import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return;
  // console.log(movieLists);

  return (
    <div className="p-4 m-4 bg-black/80 text-white">
      {movieNames.map((movie, index) => (
        <MovieList key={movie} title={movie} movies={movieResults[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
