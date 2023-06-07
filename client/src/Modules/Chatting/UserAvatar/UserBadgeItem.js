import React from "react";
import Box from "@mui/material/Box";
import "../Components/ChattingStyling.css";
const UserBadgeItem = ({ user, handleFunction, uniqueKey }) => {
  return (
    <Box
      key={uniqueKey}
      style={{
        cursor: "pointer",
        display: "flex",
        backgroundColor: "#da4ea2",
        color: "white",
        width: "fit-content",
        height: "auto",
        padding: "5px",
        border: "1px solid",
        borderRadius: "15px",
      }}
      onClick={handleFunction}
    >
      {user.name}
      <img
        src="./Images/CloseIcon.png"
        alt="Close Icon"
        className="closeIcon"
      />
    </Box>
  );
};

export default UserBadgeItem;
