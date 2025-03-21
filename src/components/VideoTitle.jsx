import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[100%] aspect-video absolute top-0 bottom-0 text-white bg-gradient-to-r from-black">
      <div className="w-5/12 ml-50 pt-[15%]">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <h2 className="w-1/2 mb-5">{overview}</h2>
        <div className="mb-4">
          <button className="bg-white text-black px-7 py-1.5 font-semibold rounded-sm shadow mr-5 border text-sm hover:bg-white/40 cursor-pointer">
            Play
          </button>
          <button className="bg-white/30 text-white px-4 py-1.5 font-semibold rounded-sm shadow mr-5 border border-transparent text-sm">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
