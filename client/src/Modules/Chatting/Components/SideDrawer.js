import { Tooltip, Button, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import "./ChattingStyling.css";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import { ListItemText, TextField } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { getSender } from "../config/ChatLogics";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const navigate = useNavigate();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      setSearchError("Please enter something to search");
    } else {
      setSearchError("");
      setSearchResult([]);
      setLoading(true);

      try {
        const config = {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `/api/user/auth?search=${search}`,
          config
        );

        setLoading(false);
        setSearchResult(data);
        //console.log(data);
        //console.log(data[4].pic);
        //data.map((user) => console.log(user._id));
      } catch (error) {
        setLoading(false);
        setSearchError("Failed to load Search Results");
        //console.log(error);
      }
    }
  };

  const accessChat = async (userId) => {
    //console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      // onClose();
    } catch (error) {
      window.alert(error.message);
    }
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (notif) => {
    setSelectedChat(notif.chat);
    setNotification(notification.filter((n) => n !== notif));
    handleMenuClose();
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        width="98.5%"
        height="auto"
        padding="5px 10px 5px 10px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={toggleDrawer(true)}>
            <img
              src="/Images/search.png"
              alt="search"
              style={{
                width: "44px",
                height: "auto",
              }}
            />
          </Button>
        </Tooltip>
        <h2 className="chattingTitle">Chatting Feature</h2>
        <div style={{ display: "flex" }}>
          <div>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              style={{ marginRight: "15px" }}
            >
              <Badge badgeContent={notification.length} color="secondary">
                <NotificationsIcon
                  fontSize="large"
                  style={{ color: "#da4ea2" }}
                />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!notification.length && (
                <MenuItem onClick={handleMenuClose}>No New Messages</MenuItem>
              )}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => handleMenuItemClick(notif)}
                >
                  {notif.chat.isGroupChat ? (
                    <>
                      <img
                        src="./Images/chattinggroupIcon.png"
                        alt="chattingPersonIcon"
                        style={{ width: "50px", paddingRight: "15px" }}
                      />
                      {`New Message in ${notif.chat.chatName}`}
                    </>
                  ) : (
                    <>
                      <img
                        src="./Images/chattingPersonIcon.jpg"
                        alt="chattingPersonIcon"
                        style={{ width: "50px", paddingRight: "15px" }}
                      />

                      {`New Message from ${getSender(user, notif.chat.users)}`}
                    </>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <Avatar src={user.pic} alt="Avatar" className="avatar" />

          <button className="logoutButton" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </Box>
      <div className="drawerMain">
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <List>
            <ListItem>
              <TextField
                placeholder="Search by name or email"
                className="drawer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="searchButton" onClick={handleSearch}>
                <SearchIcon />
              </button>
            </ListItem>
            {searchResult.length > 0 && (
              <ListItem>
                <ListItemText
                  primary={searchResult.map((user) => user.username)}
                />
              </ListItem>
            )}
          </List>

          {loading ? (
            <p>Loading....</p>
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}

          {loadingChat && <h2>Loading....</h2>}
        </Drawer>
      </div>
    </>
  );
};

export default SideDrawer;
