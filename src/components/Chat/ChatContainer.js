import React from "react";
import ChatFeed from "./ChatFeed";
import ChatInput from "./ChatInput";
import ChatLayout from "./ChatLayout";
import Chat from "./Chat";

const ChatContainer = ({ messages, sendMessage }) => {
  const [chatInput, setChatInput] = React.useState("");

  const send = () => {
    sendMessage(chatInput);
    setChatInput("");
  };

  return (
    <div className="text-black bg-white border-2 border-gray-300 h-auto">
      <ChatLayout className="text-black bg-white">
        <ChatFeed className="text-black bg-white ">
          {messages.map((m) => (
            <Chat key={m.messageId} msg={m} />
          ))}
        </ChatFeed>
        <ChatInput
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={() => {
            send();
          }}
        />
      </ChatLayout>
    </div>
  );
};

export default ChatContainer;
