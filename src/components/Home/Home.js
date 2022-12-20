import React, { useEffect, useState } from "react";
import { StreamRepository, StreamStatus } from "@amityco/js-sdk";
import HomeCard from "./HomeCard";
import CreateStream from "./CreateStream";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  let [idleStreams, setIdleStreams] = useState([]);
  let [liveStreams, setliveStreams] = useState([]);
  let [recordedStreams, setRecordedStreams] = useState([]);
  let [isReady, setIsReady] = useState(false);
  const [isStreamModalOpen, toggleStreamModalOpen] = useState(false);

  useEffect(() => {
    const idleLiveCollection = StreamRepository.queryStreams({
      statuses: [StreamStatus.Live, StreamStatus.Idle, StreamStatus.Recorded],
      isDeleted: false,
      sortBy: "lastCreated",
    });

    idleLiveCollection.on("dataUpdated", (newModels) => {
      newModels.forEach((element) => {
        switch (element.status) {
          case StreamStatus.Live:
            liveStreams.push(element);
            setliveStreams(liveStreams);
            break;
          case StreamStatus.Idle:
            idleStreams.push(element);
            setIdleStreams(idleStreams);
            break;
          case StreamStatus.Recorded:
            recordedStreams.push(element);
            setRecordedStreams(recordedStreams);
            break;
        }
      });
      setIsReady(true);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-row m-5">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => toggleStreamModalOpen(!isStreamModalOpen)}
        >
          <p className="text-xl font-semibold text-black-700">
            Create new stream
          </p>
        </button>
        <CreateStream
          isStreamModalOpen={isStreamModalOpen}
          toggleStreamModalOpen={toggleStreamModalOpen}
        />
      </div>

      {isReady && (
        <div className="flex flex-col">
          {liveStreams.length > 0 && (
            <div>
              <div className="text-2xl font-semibold text-black-700 m-2 mt-5">
                Live
              </div>
              <div className="flex flex-row overflow-x-auto">
                {liveStreams.map((stream) => {
                  return (
                    <NavLink key={stream.streamId} to={stream.streamId}>
                      <HomeCard key={stream.streamId} stream={stream} />
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
          {recordedStreams.length > 0 && (
            <div>
              <div className="text-2xl font-semibold text-black-700 m-2 mt-5">
                Recorded
              </div>
              <div className="flex flex-row overflow-x-auto">
                {recordedStreams.map((stream) => {
                  return (
                    <Link key={stream.streamId} to={stream.streamId}>
                      <HomeCard key={stream.streamId} stream={stream} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          {idleStreams.length > 0 && (
            <div>
              <div className="text-2xl font-semibold text-black-700 m-2 mt-5">
                Idle
              </div>
              <div className="flex flex-row overflow-x-auto">
                {idleStreams.map((stream) => {
                  return (
                    <NavLink key={stream.streamId} to={stream.streamId}>
                      <HomeCard key={stream.streamId} stream={stream} />
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
