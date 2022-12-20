import React from 'react';

const ChatLayout = ({ children }) => {

  return (
    <div className='flex flex-col bg-white rounded-lg chat-shadow relative'>
      <div className='font-bold text-lg my-1 text-black bg-white py-1 border-b border-gray-200 w-full'>
        Live Chat
      </div>
        {children}
    </div>
  );
};

export default ChatLayout;