import React from "react";
import ChatHome from "./ChatHome";
import ChatProvider from "./Context/ChatProvider";

const ChatMain = () => {
  return (
    <>
      <ChatProvider>
        <ChatHome />
      </ChatProvider>
    </>
  );
};

export default ChatMain;
