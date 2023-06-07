import React from "react";
import { ChatState } from "../Context/ChatProvider";
import Box from "@mui/material/Box";
import SingleChat from "./SingleChat";
import { useMediaQuery } from "@mui/material";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      display={{
        xs: selectedChat ? "flex" : "none",
        md: "flex",
      }}
      alignItems="center"
      flexDirection="column"
      backgroundColor="white"
      padding="3px"
      color="black"
      width="100%"
      marginLeft={isMobile ? "0px" : "50px"}
      borderRadius="10px"
      justifyContent="center"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
