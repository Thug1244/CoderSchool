import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuestionDetails = () => {
  const [question, setQuestion] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();
  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);
  const id = parsedData._id;
  const role = parsedData._role;
  const [updatedQuestion, setUpdatedQuestion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  const [editCommentText, setEditCommentText] = useState("");
  console.log(role);
  const navigate = useNavigate();
  useEffect(() => {
    fetchQuestion();
    setIsLoading(false);
  }, []);

  const handleSubmitComment = async () => {
    try {
      setIsLoading(true);
      const token = parsedData.token;
      const pic = parsedData.pic;
      const newComment = { content: commentInput, pic: pic };
      const updatedQuestion = { ...question };
      updatedQuestion.comments.push(newComment);
      setQuestion(updatedQuestion);
      // console.log(newComment);
      setCommentInput("");
      localStorage.setItem(
        `question_${postId}_comments`,
        JSON.stringify(updatedQuestion.comments)
      );
      const response = await axios.post(
        `/api/community/${postId}/comments`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchQuestion();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to submit comment:", error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`/api/community/${postId}`);
      setQuestion(response.data);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };
  useEffect(() => {
    fetchQuestion();
  }, [postId]);

  const handleEditQuestion = () => {
    // check if the user is the author of the post
    if (question.author === id) {
      setShowEditModal(true);
      setUpdatedQuestion({ ...question }); // create a copy of the original question to modify
    } else {
      // console.log("Only the author can edit this post.");
      window.alert("Only the author can edit this post.");
    }
  };

  const handleSubmitEditedQuestion = async () => {
    try {
      setIsLoading(true);
      const token = parsedData.token;
      const response = await axios.put(
        `/api/community/${postId}`,
        updatedQuestion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setQuestion(updatedQuestion); // update the question state with the updated question
      setShowEditModal(false); // hide the edit modal
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to submit edited question:", error);
    }
  };
  const handleDeleteQuestion = async () => {
    // check if the user is the author of the post
    if (question.author === id || parsedData.role === "Admin") {
      try {
        setIsLoading(true);
        const token = parsedData.token;
        await axios.delete(`/api/community/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        window.alert("Post deleted successfully");
        navigate("/community");
        // redirect the user to the community page or other appropriate page
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to delete question:", error);
        window.alert("Only admins can delete questions");
      }
    } else {
      console.log("Only the author can delete this post.");
      window.alert("Only admins can delete questions");
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditingCommentText(commentText);
  };

  const handleUpdateComment = async () => {
    try {
      setIsLoading(true);
      const token = parsedData.token;
      const commentToUpdate = question.comments.find(
        (comment) => comment._id === editingCommentId
      );
      const updatedComment = { ...commentToUpdate, content: editCommentText };
      const updatedQuestion = { ...question };
      const commentIndex = updatedQuestion.comments.findIndex(
        (comment) => comment._id === editingCommentId
      );
      updatedQuestion.comments[commentIndex] = updatedComment;
      setQuestion(updatedQuestion);
      setEditingCommentId(null);
      setEditCommentText("");
      localStorage.setItem(
        `question_${postId}_comments`,
        JSON.stringify(updatedQuestion.comments)
      );
      const response = await axios.put(
        `/api/community/${postId}/comments/${editingCommentId}`,
        updatedComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setIsLoading(true);
      const token = parsedData.token;
      const response = await axios.delete(
        `/api/community/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedQuestion = { ...question };
      const commentIndex = updatedQuestion.comments.findIndex(
        (comment) => comment._id === commentId
      );
      updatedQuestion.comments.splice(commentIndex, 1);
      setQuestion(updatedQuestion);
      setIsLoading(false);
      window.alert("Comment deleted successfully");
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to delete comment:", error);
      window.alert("Failed to delete comment");
    }
  };

  if (isLoading || !question) {
    // Check if isLoading is true or if the question is still null

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
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "15px",
        padding: "15px",
      }}
    >
      <h2 style={{ color: "#da4ea2", display: "flex", alignItems: "center" }}>
        <img
          src="/Images/arrow.gif"
          alt="arrow"
          style={{
            marginRight: "10px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
        {question.title}
      </h2>
      <div id="button-container"></div>
      <div
        style={{
          border: "1px solid black",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <ReactQuill
          value={question.content}
          readOnly={true}
          modules={{
            toolbar: false,
          }}
        />
        <span style={{ paddingBottom: "7px" }}>
          <b style={{ color: "#da4ea2" }}>Date:</b>{" "}
          {new Date(question.createdAt).toLocaleString()}
        </span>
      </div>
      {question.author === id && (
        <div>
          <button
            onClick={handleEditQuestion}
            style={{
              display: "inline-flex",
              padding: "5px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDeleteQuestion}
            style={{
              display: "inline-flex",
              padding: "5px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            Delete
          </button>
        </div>
      )}
      {parsedData.role === "Admin" && (
        <div>
          <button
            onClick={handleDeleteQuestion}
            style={{
              display: "inline-flex",
              padding: "5px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            Delete
          </button>
        </div>
      )}
      {showEditModal && (
        <div>
          <input
            type="text"
            value={updatedQuestion.title}
            onChange={(event) =>
              setUpdatedQuestion({
                ...updatedQuestion,
                title: event.target.value,
              })
            }
          />
          <ReactQuill
            value={updatedQuestion.content}
            onChange={(value) =>
              setUpdatedQuestion({ ...updatedQuestion, content: value })
            }
          />
          <button onClick={handleSubmitEditedQuestion}>Save</button>
          <button onClick={() => setShowEditModal(false)}>Cancel</button>
        </div>
      )}

      <h3>{question.comments.length} Answers</h3>

      {question.comments.map((comment) => (
        <div
          key={comment._id} // Assign a unique key prop to each rendered comment
          style={{
            padding: "15px",
            borderStyle: "solid",
            borderColor: "black",
            margin: "5px",
            borderWidth: "1px",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={comment.pic}
              alt="profile"
              style={{
                width: "5%",
                height: "auto",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
          </div>
          <span style={{ paddingBottom: "7px" }}>
            <b style={{ color: "#da4ea2" }}>Date:</b>{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </span>
          {comment.author === id && (
            <div>
              <button
                onClick={() => handleEditComment(comment._id, comment.content)}
                style={{
                  display: "inline-flex",
                  padding: "5px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                style={{
                  display: "inline-flex",
                  padding: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                Delete
              </button>
            </div>
          )}
          {parsedData.role === "Admin" && (
            <div>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                style={{
                  display: "inline-flex",
                  padding: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                Delete
              </button>
            </div>
          )}

          {editingCommentId === comment._id && (
            <div>
              <textarea
                className="edit-comment-textarea"
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
              />
              <button
                onClick={handleUpdateComment}
                style={{
                  display: "inline-flex",
                  padding: "5px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                Update comment
              </button>
            </div>
          )}
        </div>
      ))}
      <div>
        <h2 style={{ color: "#da4ea2" }}>Add your Comment here</h2>
        <ReactQuill
          value={commentInput}
          onChange={setCommentInput}
          placeholder="Content"
          style={{
            backgroundColor: "white",
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
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
        {/* <textarea
          placeholder="Add a comment..."
          value={commentInput}
          onChange={handleCommentInputChange}
        />*/}
        <button
          onClick={handleSubmitComment}
          style={{
            backgroundColor: "#da4ea2",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuestionDetails;
