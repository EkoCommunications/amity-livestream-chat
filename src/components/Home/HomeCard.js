import React from "react";

const HomeCard = ({ stream }) => {
  return (
    <div className="flex flex-col m-2 w-60" key={stream.streamId}>
      <img
        className="max-w-lg h-auto rounded-lg border bg-gray-300 hover:bg-gray-400"
        src="assets/play-image.png"
        alt="image description"
      />
      <div className="text-center">{stream.title}</div>
    </div>
  );
};

export default HomeCard;
