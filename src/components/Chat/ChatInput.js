import React from "react";

const ChatInput = ({ value, onChange, onKeyPress }) => {
  return (
    <div className="flex items-end border border-gray-300">
      <div className="relative w-full mr-3">
        <input
          value={value}
          onChange={onChange}
          type="text"
          className="px-3 py-2 m-2 bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comment"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (!event.shiftKey) {
                event.preventDefault();
                if (value.trim() !== "") {
                  onKeyPress();
                }
              }
            }
          }}
        />
      </div>
      <button
        type="button"
        className="px-3 py-2 m-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={value.trim() !== "" ? onKeyPress : undefined}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
