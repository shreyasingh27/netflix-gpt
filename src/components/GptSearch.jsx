import React from "react";
import { BG_URL } from "../utils/constants";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearch = () => {
  const selectedLang = useSelector((store) => store.config.language);
  return (
    <div>
      <div className="absolute w-full">
        <img className="h-[100vh] w-full object-cover" src={BG_URL} />
      </div>
      <div className="text-white flex bg-black/90 z-10 top-0 bottom-0 m-auto absolute h-[70px] left-0 right-0 w-max p-4 rounded min-w-[600px] justify-center">
        <input
          className=" w-[80%] border border-gray-500 h-10 rounded px-2"
          type="text"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button className="ml-2 text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2  self-start cursor-pointer">
          {lang[selectedLang].search}
        </button>
      </div>
    </div>
  );
};

export default GptSearch;
