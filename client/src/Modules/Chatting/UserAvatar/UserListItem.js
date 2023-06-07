import React from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import "../Components/ChattingStyling.css";
const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      backgroundColor="#E8E8E8"
      _hover={{
        backgroundColor: "#38B2AC",
        color: "white",
      }}
      width="100%"
      display="flex"
      align-items="center"
      color="black"
    >
      <div className="searchResultMain">
        <Avatar cursor="pointer" name={user.name} src={user.pic} />
        <div className="searchResult">
          {user.name}
          <br></br>
          <b>Email: </b>
          {user.email}
        </div>
      </div>
    </Box>
  );
};

export default UserListItem;
