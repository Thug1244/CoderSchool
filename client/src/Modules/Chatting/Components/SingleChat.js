import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import Box from "@mui/material/Box";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import "./ChattingStyling.css";
import { FormControl } from "@mui/material";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import axios from "axios";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      //console.log(messages);
      //console.log(data.sender);
      //console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //give notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived], ...notification);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  //console.log(notification, "----------");

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        //console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        window.alert(error.message);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!isTyping) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  //console.log(user.name);
  //console.log(selectedChat.users[0]);
  //console.log(selectedChat.users[1]);
  //console.log(selectedChat.map((user) => user.name));
  return (
    <div className="SingleChatMain">
      {selectedChat ? (
        <>
          <text className="SingleChat">
            <ArrowCircleLeftIcon
              className="IconButton"
              onClick={() => setSelectedChat("")}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            />
            {!selectedChat.isGroupChat ? (
              <>
                <ArrowCircleLeftIcon
                  className="IconButton"
                  onClick={() => setSelectedChat("")}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                />
                <img
                  src={
                    selectedChat.users[0].email === user.email
                      ? selectedChat.users[1].pic
                      : selectedChat.users[0].pic
                  }
                  alt={selectedChat.users[0].name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    color: "black",
                    margin: "10px",
                  }}
                />
                {selectedChat.users[0].email === user.email
                  ? selectedChat.users[1].name.toUpperCase()
                  : selectedChat.users[0].name.toUpperCase()}
              </>
            ) : (
              <>
                <ArrowCircleLeftIcon
                  className="IconButton"
                  onClick={() => setSelectedChat("")}
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                />
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            padding="3px"
            width="100%"
            height="100%"
            borderRadius="large"
            overflow="hidden"
          >
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "80vh",
                    paddingLeft: "50px",
                  }}
                  src="./Images/loading.gif"
                  alt="loading"
                />
              </Box>
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              isRequired
              style={{ marginBottom: "61px" }}
              width="100%"
            >
              {isTyping ? (
                <img
                  src="./Images/typingLoading.gif"
                  alt="typing..."
                  loop="true"
                  style={{
                    width: "10%",
                    height: "auto",
                  }}
                />
              ) : (
                <></>
              )}
              <input
                varient="filled"
                placeholder="Enter a message...."
                bg="#E0E0E0"
                color="primary"
                onChange={typingHandler}
                value={newMessage}
                style={{
                  width: "99%",
                  display: "flex",
                  height: "40px",
                  borderRadius: "5px",
                  marginBottom: "3px",
                  borderColor: "linear-gradient(to right, #ff0000, #00ff00);",
                }}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <text fontSize="28px">Click on a user to start chatting</text>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;
