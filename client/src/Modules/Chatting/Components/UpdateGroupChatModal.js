import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import RemoveRedEyeSharpIcon from "@mui/icons-material/RemoveRedEyeSharp";
import { ChatState } from "../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import axios from "axios";
import "./ChattingStyling.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      window.alert("ERROR");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  const handleRename = async () => {
    //console.log(selectedChat.users);
    if (!groupChatName) return;
    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      //console.log(data);
      //console.log(selectedChat.users);
      setSelectedChat("");
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.log(error);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };
  /////////////////////////////////////////
  ////////////////////////////////////////
  ///////////////////////////////////////

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/user/auth?search=${query}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      window.alert("User already added");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      window.alert("only admins can add users");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <RemoveRedEyeSharpIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "auto" }}>
          <h3
            id="parent-modal-title"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {selectedChat.chatName}
          </h3>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            padding="10px"
          >
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={user._id}
                user={u}
                uniqueKey={u._id}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </Box>
          <FormControl>
            <InputLabel htmlFor="my-input">Rename Group</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              Rename your group by typing here
            </FormHelperText>
            <button
              className="logoutButton"
              onClick={handleRename}
              isLoading={renameloading}
            >
              Update
            </button>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input" style={{ paddingTop: "10px" }}>
              Add Users
            </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <FormHelperText id="my-helper-text">
              eg: Talha, hassan, john
            </FormHelperText>
          </FormControl>
          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResult
              ?.slice(0, 3)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
          )}

          <button
            onClick={() => handleRemove(user)}
            style={{
              backgroundColor: "red",
              padding: "10px",
              color: "white",
              borderRadius: "8px",
              float: "right",
              right: "0",
              bottom: "0",
              position: "absolute",
            }}
          >
            Leave Group
          </button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            style={{ position: "absolute", top: "0", right: "0" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
export default UpdateGroupChatModal;
