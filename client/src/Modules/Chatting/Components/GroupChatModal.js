import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import "../Components/ChattingStyling.css";

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

export default function GroupChatModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      window.alert("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

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
        `/api/user/auth?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      window.alert("Please fill all required fields");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);

      window.alert("Successfully created group chat");
    } catch (error) {
      window.alert(error.message);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2
            id="parent-modal-title"
            style={{
              color: "#da4ea2",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Create Group Chat
          </h2>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            style={{ position: "absolute", top: "0", right: "0" }}
          >
            Close
          </Button>
          <div
            id="parent-modal-description"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormControl>
              <InputLabel htmlFor="my-input">Group Name</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Enter the name of the group
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="my-input">Add Users</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                eg: Talha, hassan, john
              </FormHelperText>
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap" className="UserBadgeItem">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </div>
          <button onClick={handleSubmit} className="createGroup">
            Create Group
          </button>
        </Box>
      </Modal>
    </div>
  );
}
