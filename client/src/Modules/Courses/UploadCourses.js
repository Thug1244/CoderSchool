import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./Courses.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UploadCourses = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]); // State variable to hold uploaded videos
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);

  // Function to handle image uploads
  const postImageDetails = (image) => {
    setLoading(true);
    setThumbnailUrl(image);
    if (image === undefined) {
      console.log("error");
      setLoading(false);
      return;
    }
    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "Code School");
      data.append("cloud_name", "talha1244");
      fetch("https://api.cloudinary.com/v1_1/talha1244/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setThumbnailUrl(data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  // Function to handle adding a new video to the array
  const addVideo = (video, index) => {
    setLoading(true);
    if (!video) {
      console.log("No video uploaded");
      return;
    }

    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "Code School");
    data.append("cloud_name", "talha1244");

    fetch("https://api.cloudinary.com/v1_1/talha1244/video/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.url) {
          console.log("Error uploading video");
          setLoading(false);
          return;
        }

        const newVideos = [...videos];
        newVideos[index] = {
          title: newVideos[index].title,
          description: newVideos[index].description,
          videoUrl: data.url,
        };

        setVideos(newVideos);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const videoData = videos.map((video) => ({
      title: video.title,
      description: video.description,
      videosUrl: video.videoUrl,
    }));

    const data = {
      title,
      description,
      thumbnailUrl,
      videos: videoData,
      price,
    };
    console.log(data);
    toast.success("Successfully uploaded the course!");
    navigate("/showcourses");
    const storedData = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(storedData);

    const token = parsedData.token;

    axios
      .post(
        "/api/courses",
        {
          title,
          description,
          thumbnailUrl,
          videos: videoData,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", description: "", videoUrl: "" }]);
  };

  // Function to handle removing a video input field
  const handleRemoveVideo = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  // Function to handle changing the title, description, and video file of a video
  const handleVideoChange = (index, event) => {
    const { name, value, files } = event.target;
    const newVideos = [...videos];
    if (name === "video") {
      addVideo(files[0], index); // Call the addVideo function with the video file and index
    } else {
      newVideos[index][name] = value;
      setVideos(newVideos);
    }
  };

  return (
    <div className="upload-container">
      <ToastContainer />
      <div className="ChildUploadCourseBlock">
        <h2 style={{ color: "#da4ea2", textAlign: "center", fontSize: "28px" }}>
          Upload a Course
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => postImageDetails(e.target.files[0])}
            required
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label htmlFor="videos">Videos</label>
          {videos.map((video, index) => (
            <div key={index} className="video-input-container">
              <input
                type="file"
                id={`video${index}`}
                name="video"
                accept="video/mp4"
                onChange={(e) => handleVideoChange(index, e)} // Call handleVideoChange function
                required
              />
              <div className="video-input-fields">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={video.title}
                  onChange={(e) => handleVideoChange(index, e)}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={video.description}
                  onChange={(e) => handleVideoChange(index, e)}
                  required
                ></textarea>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveVideo(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button variant="contained" onClick={handleAddVideo}>
            Add Video
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadCourses;
