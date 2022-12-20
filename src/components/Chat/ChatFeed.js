import React, { useEffect, useRef } from "react";

const ChatFeed = ({ children }) => {
  const nodeRef = useRef();
  useEffect(() => {
    nodeRef.current.scrollTo({ 
      top: nodeRef.current.scrollHeight, 
      behavior: 'smooth'
    }); 
  }, [children.length])

  return (
      <div
        ref={nodeRef}
        id="chat-feed"
        className="w-full px-2 text-black bg-white overflow-y-auto"
        style={{ height: "70vh" }}
      >
        <div className="flex flex-col justify-end h-auto">{children}</div>
      </div>
  );
};

export default ChatFeed;
