import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Typography, Grid, Paper } from "@material-ui/core";
import StripeCheckout from "react-stripe-checkout";
import moment from "moment";
import "./Courses.css";

const CourseDetails = () => {
  const [course, setCourse] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { courseId } = useParams();
  const [review, setReview] = useState("");
  const storedData = localStorage.getItem("userInfo");
  const [stripe, setStripe] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedVideoTitle, setUpdatedVideoTitle] = useState("");
  const [updatedVideoDescription, setUpdatedVideoDescription] = useState("");
  const [updatedVideo, setUpdatedVideo] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const parsedData = JSON.parse(storedData);
  const id = parsedData._id;
  const token = parsedData.token;
  const pic = parsedData.pic;
  const role = parsedData.role;
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");

  const [uploadingVideo, setUploadingVideo] = useState(false);

  //console.log(role);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}`);
      setCourse(response.data);
      setTitle(response.data.title);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (course) {
      checkEnrollment();
    }
  }, [course]);
  console.log(course);

  useEffect(() => {
    async function load() {
      const stripe = await loadStripe(
        "pk_test_51N3ZiCB5jzzkxny0n7d76XsQlik8vm3c57IeIsw5mVsKBcNBailyWuP3Imv0Eg8XrymDcz6iUUMcP7I0KaWVlVUR007PJkKiv6"
      );
      setStripe(stripe);
    }
    load();
  }, []);

  const enrollUser = async () => {
    try {
      await axios.post(
        `/api/courses/${courseId}/enroll`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.alert(
        "Congratulations you have successfully enrolled in the course"
      );
      setIsEnrolled(true);
    } catch (error) {
      console.error("Failed to enroll student:", error);
    }
  };

  const onToken = async (response) => {
    if (response.id) {
      enrollUser();
    }
  };

  const checkEnrollment = () => {
    const userId = id;

    if (
      course.enrollments.some((enrollment) => enrollment.student === userId) ||
      course.teacher === userId ||
      role === "Admin"
    ) {
      setIsEnrolled(true);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const submitReview = async (e) => {
    e.preventDefault(); // prevent default form submission behavior
    console.log(review);
    try {
      await axios.post(
        `/api/courses/${courseId}/comments`,
        { content: review },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Successfully uploaded a review!");
      fetchCourse();
    } catch (error) {
      console.log(error);
      window.alert("Invalid Credentials: ");
    }
  };

  const handleUpdateTitle = async () => {
    try {
      await axios.put(
        `/api/courses/${courseId}`,
        { title: updatedTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update the course state with the new title
      setCourse({ ...course, title: updatedTitle });
      // Close the modal
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update course title:", error);
    }
  };
  const handleUpdateDescription = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `/api/courses/${courseId}`,
        { description: updatedDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCourse(response.data);
      setUpdatedDescription("");
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update course description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateThumbnail = async (newThumbnail) => {
    try {
      setIsUploading(true);

      const data = new FormData();
      data.append("file", newThumbnail);
      data.append("upload_preset", "Code School");
      data.append("cloud_name", "talha1244");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/talha1244/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      const newThumbnailUrl = result.url;

      await axios.put(
        `/api/courses/${courseId}`,
        { thumbnailUrl: newThumbnailUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setCourse({ ...course, thumbnailUrl: newThumbnailUrl });
      setNewThumbnail("");
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update course thumbnail:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleUpdateVideoTitle = async (videoId, newTitle) => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/videos/${videoId}`,
        { videoTitle: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedVideos = course.videos.map((video) => {
        if (video._id === videoId) {
          return { ...video, title: newTitle };
        }

        return video;
      });
      console.log(updatedVideos);
      setCourse({ ...course, videos: updatedVideos });

      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update video title:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVideoDescription = async (videoId, newDescription) => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/videos/${videoId}`,
        { videoDescription: newDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedVideos = course.videos.map((video) => {
        if (video._id === videoId) {
          return { ...video, description: newDescription };
        }

        return video;
      });
      console.log(updatedVideos);
      setCourse({ ...course, videos: updatedVideos });

      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update video title:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVideoLink = async (videoId, newVideo) => {
    try {
      setUploadingVideo(true);
      const videoUrl = await uploadVideoToCloudinary(newVideo);
      console.log("videoUrl", videoUrl);
      await axios.put(
        `/api/courses/${courseId}/videos/${videoId}`,
        { videoLink: videoUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedVideos = course.videos.map((video) => {
        if (video._id === videoId) {
          return { ...video, videosUrl: videoUrl };
        }
        return video;
      });

      setCourse({ ...course, videos: updatedVideos });

      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update video link:", error);
    } finally {
      setUploadingVideo(false);
    }
  };

  const uploadVideoToCloudinary = async (video) => {
    try {
      setUploadingVideo(true);

      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "Code School");
      data.append("cloud_name", "talha1244");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/talha1244/video/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      const videoUrl = result.url;

      console.log(videoUrl);

      return videoUrl;
    } catch (error) {
      console.error("Failed to upload video to Cloudinary:", error);
      throw error;
    } finally {
      setUploadingVideo(false);
    }
  };
  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`/api/courses/${courseId}/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter out the deleted video from the course's videos array
      const updatedVideos = course.videos.filter(
        (video) => video._id !== videoId
      );

      // Update the course state with the updated videos array
      setCourse({ ...course, videos: updatedVideos });
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  return (
    <div>
      <div className="CourseDeatilsMain">
        <div className="LeftCourseDetailMain">
          <div style={{ height: "300px" }}>
            <img
              src={course.thumbnailUrl}
              alt="courseThumbnail"
              style={{
                display: "block",
                margin: "auto",
                height: "100%",
                width: "80%",
                paddingTop: "30px",
                borderRadius: "15px",
              }}
            />

            {showEditModal && (
              <div className="thumbnailmodal">
                <div className="modal-content">
                  <span
                    className="close"
                    onClick={() => setShowEditModal(false)}
                  >
                    &times;
                  </span>

                  <form onSubmit={handleUpdateThumbnail}>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        id="newThumbnail"
                        name="newThumbnail"
                        placeholder="Choose new thumbnail"
                        onChange={(e) =>
                          handleUpdateThumbnail(e.target.files[0])
                        }
                      />
                      <label htmlFor="newThumbnail" style={{ color: "white" }}>
                        Choose new thumbnail
                      </label>
                      <button type="submit" className="Coursesbutton">
                        Upload
                      </button>
                      {isUploading && <div>Loading...</div>}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: "10%" }}>
            {parsedData._id === course.teacher && (
              <button
                onClick={() => setShowEditModal(true)}
                className="Coursesbutton"
              >
                Edit Course
              </button>
            )}

            {role === "Admin" && (
              <button
                onClick={() => setShowEditModal(true)}
                className="Coursesbutton"
              >
                Edit Course
              </button>
            )}
            <h2 style={{ color: "#da4ea2", fontWeight: "bold" }}>
              {course.title}
            </h2>

            {showEditModal && (
              <div className="titlemodal">
                <div className="modal-content">
                  <span
                    className="close"
                    onClick={() => setShowEditModal(false)}
                  >
                    &times;
                  </span>

                  <form onSubmit={handleUpdateTitle}>
                    <div>
                      <label htmlFor="title" style={{ color: "white" }}>
                        Update Title:{" "}
                      </label>
                      <input
                        id="title"
                        type="text"
                        placeholder="Enter updated title"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="Coursesbutton">
                      Update Title
                    </button>
                  </form>
                </div>
              </div>
            )}

            <h3 style={{ color: "white" }}>{course.description}</h3>
            {showEditModal && (
              <div className="descriptionmodal">
                <div className="modal-content">
                  <span
                    className="close"
                    onClick={() => setShowEditModal(false)}
                  >
                    x
                  </span>

                  <form onSubmit={handleUpdateDescription}>
                    <div>
                      <label htmlFor="description" style={{ color: "white" }}>
                        Update Description:{" "}
                      </label>
                      <input
                        type="text"
                        placeholder="Enter updated description"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="Coursesbutton">
                      Update Description
                    </button>
                  </form>
                </div>
              </div>
            )}
            <div style={{ display: "flex" }}>
              <h3 style={{ color: "#da4ea2" }}>Uploaded at: </h3>
              <div
                style={{
                  paddingTop: "20px",
                  paddingLeft: "10px",
                  color: "white",
                }}
              >
                {moment(course.createdAt).format("DD-MM-YYYY")}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <h3 style={{ color: "#da4ea2" }}> Last Updated: </h3>
              <div
                style={{
                  paddingTop: "20px",
                  paddingLeft: "10px",
                  color: "white",
                }}
              >
                {moment(course.updatedAt).format("DD-MM-YYYY")}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <h3 style={{ color: "#da4ea2" }}> Total Reviews:</h3>
              <div
                style={{
                  paddingTop: "20px",
                  paddingLeft: "10px",
                  color: "white",
                }}
              >
                {course.comments.length}
              </div>
            </div>

            <p
              style={{
                bottom: 0,
                float: "right",
                border: "1px solid #da4ea2",
                padding: "15px",
                borderRadius: "15px",
              }}
            >
              Student Enrolled: {course.enrollments.length}
            </p>
          </div>
        </div>
        <div className="RightCourseDetailMain">
          <div>
            {course.teacherInfo[0] ? (
              <div>
                <img
                  src={course.teacherInfo[0].pic}
                  alt="TeacherPic"
                  style={{
                    width: "40%",
                    borderRadius: "50%",
                    marginLeft: "30%",
                    marginBottom: "5%",
                  }}
                />
                <div>
                  <p
                    style={{
                      paddingLeft: "20px",
                      borderBottom: "1px solid white",
                      cursor: "pointer",
                    }}
                  >
                    <b style={{ color: "#da4ea2", display: "inline-flex" }}>
                      Name:
                    </b>
                    <p style={{ marginLeft: "20px", display: "inline-flex" }}>
                      {course.teacherInfo[0].name}
                    </p>
                  </p>
                  <p
                    style={{
                      paddingLeft: "20px",
                      borderBottom: "1px solid white",
                      cursor: "pointer",
                    }}
                  >
                    <b style={{ color: "#da4ea2", display: "inline-flex" }}>
                      Email:
                    </b>
                    <p style={{ marginLeft: "20px", display: "inline-flex" }}>
                      {course.teacherInfo[0].email}
                    </p>
                  </p>

                  <p style={{ paddingLeft: "20px" }}>
                    <b style={{ color: "#da4ea2", display: "inline-flex" }}>
                      Id:
                    </b>
                    <p style={{ marginLeft: "20px", display: "inline-flex" }}>
                      {course.teacherInfo[0]._id}
                    </p>
                  </p>
                </div>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </div>
      {!isEnrolled && (
        <div className="secandoryCourseDetails">
          <>
            <div>
              <h2>Interested in this Course?</h2>
              <h2>Enrolled Now to get Started</h2>
            </div>
            <button
              style={{
                width: "auto",
                backgroundColor: "transparent",
                borderColor: "none",
              }}
            >
              <StripeCheckout
                token={onToken}
                name="Add your Card"
                description="Code School"
                image={pic}
                panelLabel="Give Money" // prepended to the amount in the bottom pay button
                amount={course.price}
                currency="USD"
                stripeKey="pk_test_51N3ZiCB5jzzkxny0n7d76XsQlik8vm3c57IeIsw5mVsKBcNBailyWuP3Imv0Eg8XrymDcz6iUUMcP7I0KaWVlVUR007PJkKiv6"
              />
            </button>
          </>
        </div>
      )}
      <div>
        {isEnrolled ? (
          <>
            <h2
              style={{ color: "white", textAlign: "center", fontSize: "28px" }}
            >
              Course Videos
            </h2>
            <Grid
              container
              style={{
                marginTop: "50px",
                justifyContent: "space-around",
              }}
            >
              {course.videos.map((video) => (
                <Grid item xs={10} sm={6} md={4} key={course.id}>
                  <Paper
                    elevation={2}
                    style={{
                      padding: "10px",
                      position: "relative",
                      margin: "20px",
                    }}
                  >
                    <video
                      src={video.videosUrl}
                      alt={video.title}
                      controls
                      style={{ width: "100%" }}
                    />
                    {parsedData._id === course.teacher && (
                      <button
                        aria-label="delete"
                        onClick={() => handleDeleteVideo(video._id)}
                        className="Coursesbutton"
                      >
                        Delete
                      </button>
                    )}
                    {parsedData.role === "Admin" && (
                      <button
                        aria-label="delete"
                        onClick={() => handleDeleteVideo(video._id)}
                        className="Coursesbutton"
                      >
                        Delete
                      </button>
                    )}

                    {showEditModal && (
                      <div className="videolinkmodal">
                        <div className="modal-content">
                          <span
                            className="close"
                            onClick={() => setShowEditModal(false)}
                          >
                            &times;
                          </span>
                          <form
                            onSubmit={(e) =>
                              handleUpdateVideoLink(
                                updatedVideo._id,
                                updatedVideo
                              )
                            }
                          >
                            {uploadingVideo ? (
                              <div>Loading...</div>
                            ) : (
                              <div>
                                <input
                                  type="file"
                                  accept="video/*"
                                  id="newVideo"
                                  name="newVideo"
                                  placeholder="Choose new video"
                                  onChange={(e) =>
                                    handleUpdateVideoLink(
                                      video._id,
                                      e.target.files[0]
                                    )
                                  }
                                />
                                <label
                                  htmlFor="newVideo"
                                  style={{ color: "white" }}
                                >
                                  Choose new video
                                </label>
                              </div>
                            )}

                            <button type="submit" className="Coursesbutton">
                              Update Video Link
                            </button>
                          </form>
                        </div>
                      </div>
                    )}

                    <Typography variant="h5" style={{ marginTop: "10px" }}>
                      {video.title}
                      {showEditModal && (
                        <div>
                          <input
                            type="text"
                            value={updatedVideoTitle}
                            id={`video-title-${video._id}`}
                            onChange={(e) =>
                              setUpdatedVideoTitle(e.target.value)
                            }
                          />
                          <button
                            className="Coursesbutton"
                            onClick={() =>
                              handleUpdateVideoTitle(
                                video._id,
                                updatedVideoTitle
                              )
                            }
                          >
                            Update Title
                          </button>
                        </div>
                      )}
                    </Typography>

                    <Typography variant="body1" style={{ marginTop: "10px" }}>
                      {video.description}
                      {showEditModal && (
                        <div>
                          <input
                            type="text"
                            id="video-description"
                            value={updatedVideoDescription}
                            onChange={(e) =>
                              setUpdatedVideoDescription(e.target.value)
                            }
                          />
                          <button
                            onClick={() =>
                              handleUpdateVideoDescription(
                                video._id,
                                updatedVideoDescription
                              )
                            }
                            className="Coursesbutton"
                          >
                            Update Description
                          </button>
                        </div>
                      )}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20px",
                        justifyContent: "flex-start",
                      }}
                    ></div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                fontSize: "28px",
                border: "1px solid #da4ea2",
                padding: "15px",
                backgroundColor: "white",
                maxWidth: "fit-content",
                borderRadius: "15px",
                color: "Red",
                boxShadow: "0 16px 32px 0 rgb(241, 93, 93)",
              }}
            >
              Please enroll in the course to access its videos
            </Typography>
          </div>
        )}
      </div>
      <div>
        <h2
          style={{
            color: "white",
            textAlign: "center",
            padding: "12px",
            fontSize: "28px",
          }}
        >
          Check out what other thinks about this Course
        </h2>
        <div className="Course Reviews">
          {course.comments.map((comment) => (
            <div
              key={comment._id}
              style={{
                padding: "15px",
                borderStyle: "solid",
                borderColor: "white",
                margin: "5px",
                borderWidth: "1px",
                borderRadius: "15px",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={comment.studentInfo.pic}
                  alt="profile"
                  style={{
                    width: "5%",
                    height: "auto",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div style={{ color: "white" }}>{comment.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {isEnrolled ? (
            <>
              {parsedData._id !== course.teacher && (
                <div>
                  <div
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #da4ea2",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <img
                        src={pic}
                        alt="userPic"
                        style={{
                          width: "80px",
                          height: "auto",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <h2 style={{ textAlign: "center", fontSize: "28px" }}>
                      Want to share your Thoughts?
                    </h2>
                    <form
                      method="POST"
                      onSubmit={submitReview}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <input
                        name="review"
                        type="text"
                        id="review"
                        autoComplete="off"
                        value={review}
                        placeholder="Give review here...."
                        onChange={(e) => setReview(e.target.value)}
                        required
                        style={{
                          margin: "10px",
                          padding: "5px",
                          width: "300px",
                        }}
                      />
                      <button type="submit" className="secandorybutton">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20vh",
              }}
            >
              <Typography
                variant="body1"
                style={{
                  textAlign: "center",
                  fontSize: "28px",
                  border: "1px solid #da4ea2",
                  padding: "15px",
                  backgroundColor: "white",
                  maxWidth: "fit-content",
                  borderRadius: "15px",
                  color: "Red",
                  boxShadow: "0 16px 32px 0 rgb(241, 93, 93)",
                }}
              >
                Please enroll in the course to share your review
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
