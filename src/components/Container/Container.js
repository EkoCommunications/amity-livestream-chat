import React, { useEffect, useState } from "react";
import ChatContainer from "../Chat/ChatContainer";
import Video from "../Video/Video";
import {
  StreamRepository,
  ChannelRepository,
  MessageRepository,
  LoadingStatus,
  DataStatus,
} from "@amityco/js-sdk";

import { useParams } from "react-router-dom";

const Container = () => {
  let channelID;
  const params = useParams();
  const [cid, setCid] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [streamTitle, setStreamTitle] = useState("");
  const [streamDescription, setStreamDescription] = useState("");
  const [messages, setMessages] = useState([]);

  const getDataInsideStream = (stream) => {
    channelID = stream.metadata.channelId;
    setCid(stream.metadata.channelId);
    setStreamUrl(stream.recordings ? stream.recordings[0].mp4.url : stream.watcherUrl.hls.url)
    setStreamTitle(stream.title);
    setStreamDescription(stream.description);

    const isJoined = ChannelRepository.joinChannel({
      channelId: channelID,
    });

    isJoined.then(() => {
      const liveCollection = MessageRepository.queryMessages({
        channelId: channelID,
      });
      setMessages(liveCollection.models);

      liveCollection.on("dataUpdated", (data) => {
        setMessages(data);
      });

      liveCollection.on("dataError", (error) => {
        console.error(error);
      });
    });
  };

  useEffect(() => {
    const liveObject = StreamRepository.getStream(params.streamId);
    if (liveObject.dataStatus === DataStatus.Fresh && liveObject.model) {
      getDataInsideStream(liveObject.model);
    }
    liveObject.on("loadingStatusChanged", ({ oldValue, newValue }) => {
      if (newValue === LoadingStatus.Loaded)
        getDataInsideStream(liveObject.model);
    });
  }, []);

  const sendMessage = (msg) => {
    console.log("ChannelID: ", cid);
    const liveObject = MessageRepository.createTextMessage({
      channelId: cid,
      text: msg,
    });

    liveObject.on("dataUpdate", (message) => {
      console.log("message is created", message);
    });
  };

  return (
    <div className="App flex flex-row">
      <div className="basis-3/4">
        <div className="flex flex-col">
          <div className="pt-5 static">
            {streamTitle}
          </div>
          <div>
            <Video url={streamUrl} />
          </div>
          <div>{streamDescription}</div>
        </div>
      </div>
      <div className="basis-1/4">
        <ChatContainer messages={messages} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Container;
