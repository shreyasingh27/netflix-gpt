import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, title }) => {
  if (!movies) return;
  return (
    <div className="ml-5 px-1 md:px-10 py-3 text-white">
      <h1 className="font-bold text-2xl mb-6">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex ">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
