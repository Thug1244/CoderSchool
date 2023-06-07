import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles
import "./Community.css";
import { useNavigate } from "react-router-dom";
const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the authentication token from wherever it's stored in your app
    const storedData = localStorage.getItem("userInfo"); // assuming it's stored in localStorage

    // Parse the string back to an object
    const parsedData = JSON.parse(storedData);

    // Access the token and userId values
    const token = parsedData.token;
    const userId = parsedData.userId;

    // Create request body
    const requestBody = {
      title: title,
      content: content,
      author: userId, // Pass the userId as the value for the author field
    };

    try {
      // Make POST request to backend API with token in headers and request body
      const response = await axios.post(
        "/api/community/askQuestion",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set content type to application/json
          },
        }
      );

      // Handle successful post creation
      //console.log("Post created successfully:", response.data);

      // Clear form fields
      setTitle("");
      setContent("");
      navigate("/community");
    } catch (error) {
      // Handle error
      console.error("Error creating post:", error.response.data);
    }
  };

  return (
    <div className="askQuestionMain">
      <h2 style={{ textAlign: "center", color: "#da4ea2" }}>
        Stuck Somewhere in Code<br></br>Ask Here
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Render form fields for title, content */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "98%" }}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Content"
          style={{
            backgroundColor: "white",
            width: "100%",
            marginTop: "15px",
            paddingBottom: "43px",
            height: "420px",
          }}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["code-block"],
            ],
          }}
        />
        {/* Render other form fields */}
        <button type="submit" className="askQuestionSecandorybutton">
          Ask Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
