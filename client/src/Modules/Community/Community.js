import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Community = () => {
  const navigate = useNavigate();

  const AskQuestion = () => {
    navigate("/AskQuestion");
  };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/community/allQuestions");
        setPosts(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Reverse the posts array to display the latest post first
  const reversedPosts = [...posts].reverse();

  if (loading) {
    return (
      <>
        <img
          src="./Images/screenloading.gif"
          alt="loading"
          style={{ height: "100vh", width: "100%" }}
        />
      </>
    );
  }

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
        <h2 className="chattingTitle">Community</h2>
        <h2 style={{ color: "black" }}>Forum</h2>
        <div style={{ display: "flex" }}>
          <button className="logoutButton" onClick={AskQuestion}>
            Ask Question
          </button>
        </div>
      </Box>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "10px",
          borderRadius: "5px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {reversedPosts.map((post) => (
          <div key={post._id}>
            {post.author && ( // Add conditional check for post.author
              <Link
                to={{
                  pathname: `/api/community/${post._id}`,
                  state: {
                    authorName: post.author.name,
                    authorPic: post.author.pic,
                  },
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    margin: "20px",
                    paddingLeft: "10px",
                    cursor: "pointer",
                    borderRadius: "15px",
                    borderStyle: "solid",
                    borderColor: "black",
                  }}
                >
                  <p
                    style={{
                      padding: "10px",
                      border: "1px solid black",
                      width: "max-content",
                      borderRadius: "5px",
                      color: "#da4ea2",
                    }}
                  >
                    <b>Author: {post.author.name}</b>
                  </p>

                  <div style={{ display: "flex" }}>
                    <img
                      src={post.author.pic}
                      alt="Profile Pic"
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    <h3>{post.title}</h3>
                  </div>
                  <p style={{ marginLeft: "3%" }}>
                    <b>Description</b>
                  </p>
                  <div
                    style={{ marginLeft: "3%" }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  {/* Render the post.content as HTML content */}
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Community;
