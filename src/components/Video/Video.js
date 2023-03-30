import React from "react";
import { Player, BigPlayButton, ControlBar } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css"
import HLSSource from './HLSSource';

const Video = ({url}) => {
  return (
    <div className="w-full pl-20 pr-20 pt-10 pb-10">
      <Player autoPlay={true} >
        {
          url.includes("mp4") ? <source src={url}  type="video/mp4" /> : <HLSSource isVideoChild src={url} />
        }
        <BigPlayButton position="center" />
        <ControlBar disableCompletely={!url.includes("mp4")} />
      </Player>
    </div>
  );
};

export default Video;
