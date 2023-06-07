import React from "react";

const ErrorPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/Images/404.gif "
        alt="404 not found"
        style={{ height: "100vh", width: "90%" }}
      />
    </div>
  );
};

export default ErrorPage;
