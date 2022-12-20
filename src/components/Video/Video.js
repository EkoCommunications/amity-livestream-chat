import React from "react";

const Video = ({url}) => {
  return (
    <div>
      <video className="w-full pl-20 pr-20 pt-10 pb-10" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
