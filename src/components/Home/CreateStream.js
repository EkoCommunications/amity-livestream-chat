import React, { useState } from "react";
import { Modal, TextInput, Label, Button } from "flowbite-react";
import {
  StreamRepository,
  StreamResolutions,
  ChannelRepository,
  ChannelType,
} from "@amityco/js-sdk";

const CreateStream = ({ isStreamModalOpen, toggleStreamModalOpen }) => {
  let [streamUrl, setStreamUrl] = useState("");
  const [inputStreamTitle, setInputStreamTitle] = useState("");
  const [channelId, setChannelId] = useState("");
  const [description, setDescription] = useState("");
  const createStream = () => {
    const liveChannel = ChannelRepository.createChannel({
      channelId: channelId,
      type: ChannelType.Live,
    });
    liveChannel.once("dataUpdated", (model) => {
      console.log(`Channel created: ${model.channelId}`);
      const liveObject = StreamRepository.createStream({
        title: inputStreamTitle,
        resolution: StreamResolutions.HD,
        description: description,
        metadata: { channelId: model.channelId },
      });
      liveObject.on("dataUpdated", (stream) => {
        console.log(stream);
        setStreamUrl(stream.streamerUrl.url);
      });
    });
  };

  const setTitle = (event) => {
    setInputStreamTitle(event.target.value);
  };

  const setCid = (event) => {
    setChannelId(event.target.value);
  };

  const setStreamDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Modal
      show={isStreamModalOpen}
      size="md"
      popup={true}
      onClose={() => toggleStreamModalOpen(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create a new stream
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Stream Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Your stream title"
              onChange={setTitle}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value={"Streamer: " + "Steven"} />
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <TextInput
              id="description"
              onChange={setStreamDescription}
              required={false}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="channelId" value="Channel ID" />
            </div>
            <TextInput id="channelId" onChange={setCid} required={true} />
          </div>
          {!streamUrl && (
            <div className="w-full">
              <Button onClick={() => createStream()}>
                Get your stream url
              </Button>
            </div>
          )}

          {streamUrl && (
            <div className="mb-8">
              <div className="mt-4 shadow-inner rounded">{streamUrl}</div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateStream;
