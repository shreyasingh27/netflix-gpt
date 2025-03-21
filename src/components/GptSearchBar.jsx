import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import model from "../utils/geminiai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/gptSearchSlice";
// import openai from "../utils/openai";
const GptSearchBar = () => {
  const selectedLang = useSelector((store) => store.config.language);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1'",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    console.log(searchText.current.value);
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const response = await model.generateContent([gptQuery]);
    // console.log(response?.response.text().split(","));
    const movieList = response?.response.text().split(",");
    const promiseArray = movieList.map((movie) => searchMovieTmdb(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovies({ movieNames: movieList, movieResults: tmdbResults })
    );
    console.log(tmdbResults);
  };
  return (
    <div className="pt-[20%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          className="  p-4 m-4 col-span-9 border border-gray-500 h-10 rounded px-2 text-white"
          type="text"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearch}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg ml-2 text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2  self-start cursor-pointer"
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
