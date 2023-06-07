import React from "react";
import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Stack, Box } from "@mui/material";
import { getSender } from "../config/ChatLogics";
import { Avatar } from "@mui/material";
import GroupChatModal from "./GroupChatModal";
import "./ChattingStyling.css";

const MyChats = ({ fetchAgain }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      //chats.map((chat) => console.log(chat.users[1].email));
      //console.log(user.email);

      // data.map((user) => console.log(user.users[1].pic));
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    setTimeout(() => {
      fetchChats();
      //fetchChats().then((result) => console.log(result));
    }, 1000);
    //eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div
      style={{
        display: selectedChat && window.innerWidth <= 768 ? "none" : "flex",
        width: window.innerWidth <= 768 ? "100%" : "40%",
        md: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "20px",
        backgroundColor: "white",
        borderWidth: "10px",

        height: "100%",
        borderRadius: "2%",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          color: "black",
          display: "flex",

          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "3px",
        }}
      >
        My Chats
        <GroupChatModal>
          <button
            style={{
              display: "flex",
              padding: "3px",
              marginRight: "5px",
              marginTop: "5px",
            }}
          >
            <b style={{ marginTop: "3px", marginRight: "3px" }}>
              New Group Chat
            </b>
            <AddCircleIcon />
          </button>
        </GroupChatModal>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3px",
          backgroundColor: "white",
          color: "black",
          width: "90%",
          height: "100%",
          overflow: "hidden",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "10px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {chats ? (
          <Stack overflow="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "red" : "white"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #eee",
                    padding: "20px",
                    overflow: "hidden",
                    overflowY: "scroll",
                    backgroundColor: "#e382bc",
                    borderRadius: "15px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                        backgroundColor: "#eee",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        color: "black",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      {
                        <img
                          src={
                            chat.users[0].email === user.email
                              ? chat.users[1].pic
                              : chat.users[0].pic
                          }
                          style={{
                            width: "50px",
                            height: "auto",
                            borderRadius: "50%",
                            objectFit: "cover",
                            paddingRight: "5px",
                          }}
                          alt={
                            chat.users[0].email === user.email
                              ? chat.users[1].name
                              : chat.users[0].name
                          }
                        />
                      }
                    </div>
                    <div style={{ marginLeft: "5px", fontSize: "18px" }}>
                      {!chat.isGroupChat
                        ? chat.users[0].email === user.email
                          ? chat.users[1].name
                          : chat.users[0].name
                        : chat.chatName}
                    </div>
                  </div>
                  <div style={{ fontWeight: "bold" }}>
                    {chat.lastMessage && chat.lastMessage.timeStamp
                      ? new Date(chat.lastMessage.timeStamp).toLocaleString()
                      : ""}
                  </div>
                </div>

                {/*chat.latestMessage && (
                  <text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </text>
                    )*/}
              </Box>
            ))}
          </Stack>
        ) : (
          <p>Loading......</p>
        )}
      </div>

      {selectedChat && selectedChat.messages && (
        <div
          style={{
            backgroundColor: "white",
            height: "90%",
            width: "90%",
            overflow: "hidden",
          }}
        >
          <h2>All Chats</h2>

          <div style={{ height: "80%", overflow: "scroll" }}>
            {selectedChat.messages.map((message) => (
              <div
                key={message._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <Avatar src={message.sender.pic}>
                    {message.sender.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {message.sender.name}
                  </div>
                </div>
                <div>{message.body}</div>
                <div
                  style={{
                    alignSelf: "flex-end",
                    color: "gray",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  {/*new Date(message.timeStamp).toLocaleString()*/}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyChats;
