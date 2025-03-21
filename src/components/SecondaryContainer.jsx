import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && (
      <div className=" bg-black -mt-7 z-10 relative">
        <MovieList
          title={"Now Playing Movies"}
          movies={movies.nowPlayingMovies}
        />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;
