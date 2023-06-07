import React, { useState } from "react";
import { ChatState } from "./Context/ChatProvider";
import SideDrawer from "./Components/SideDrawer";
import MyChats from "./Components/MyChats";
import ChatBox from "./Components/ChatBox";

const ChatHome = () => {
  const { fetchAgain, setFetchAgain } = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          height: "91.5vh",
          padding: "10px",
          color: "white",
        }}
      >
        {user && (
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatHome;
