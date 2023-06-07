import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);
  const [userData, setUserData] = useState(null);

  const id = parsedData._id;
  const { userId } = useParams();
  const token = parsedData.token;

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`/api/user/profile`, config); // Fetch user data using user ID
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleCourseDelete = async (courseId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/courses/${courseId}`, config);
      // Remove the deleted course from the state or refetch the courses list from the server
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const handleUpdateCourse = async () => {};
  return (
    <div style={{ paddingBottom: "15px", backgroundColor: "white" }}>
      <div>
        <h2 style={{ color: "#da4ea2", textAlign: "center", padding: "10px" }}>
          Profile
        </h2>
        {userData ? (
          <div>
            <img
              src={userData.pic}
              alt="userPic"
              style={{
                width: "20%",
                borderRadius: "50%",
                marginLeft: "40%",
                marginBottom: "5%",
                alignSelf: "center",
              }}
            />
            <div>
              <p
                style={{
                  paddingLeft: "20px",
                  borderBottom: "1px solid #da4ea2",
                  cursor: "pointer",
                }}
              >
                <b
                  style={{
                    color: "#da4ea2",
                    display: "inline-flex",
                  }}
                >
                  Name:
                </b>
                <p
                  style={{
                    marginLeft: "20px",
                    display: "inline-flex",
                  }}
                >
                  {userData.name}
                </p>
              </p>
              <p
                style={{
                  paddingLeft: "20px",
                  borderBottom: "1px solid #da4ea2",
                  cursor: "pointer",
                }}
              >
                <b
                  style={{
                    color: "#da4ea2",
                    display: "inline-flex",
                  }}
                >
                  Email:
                </b>
                <p
                  style={{
                    marginLeft: "20px",
                    display: "inline-flex",
                  }}
                >
                  {userData.email}
                </p>
              </p>
              <p
                style={{
                  paddingLeft: "20px",
                  borderBottom: "1px solid #da4ea2",
                  cursor: "pointer",
                }}
              >
                <b
                  style={{
                    color: "#da4ea2",
                  }}
                >
                  Role:
                </b>
                <p
                  style={{
                    marginLeft: "20px",
                    display: "inline-flex",
                  }}
                >
                  {userData.role}
                </p>
              </p>
              <p
                style={{
                  paddingLeft: "20px",
                  borderBottom: "1px solid #da4ea2",
                }}
              >
                <b
                  style={{
                    color: "#da4ea2",
                    display: "inline-flex",
                  }}
                >
                  Id:
                </b>
                <p
                  style={{
                    marginLeft: "20px",
                    display: "inline-flex",
                  }}
                >
                  {userData._id}
                </p>
              </p>
            </div>
          </div>
        ) : (
          <img
            src="./Images/screenloading.gif"
            alt="loading"
            style={{ height: "100vh", width: "100%" }}
          />
        )}
        <h2 style={{ color: "#da4ea2", textAlign: "center", padding: "10px" }}>
          My Courses
        </h2>
        {courses.map((course) => {
          if (course.teacher === id) {
            return (
              <div
                key={course._id}
                style={{
                  backgroundColor: "#da4ea2",
                  border: "1px solid",
                  borderRadius: "15px",
                  padding: "15px",
                  color: "white",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>Title: {course.title}</h3>
                  <h3>Description: {course.description}</h3>
                  Thumbnail:
                  <img
                    src={course.thumbnailUrl}
                    alt={course.thumbnailUrl}
                    style={{ width: "10%" }}
                  />
                  <div>
                    <button
                      style={{
                        marginRight: "10px",
                        borderRadius: "15px",
                        backgroundColor: "lightgreen",
                        padding: "10px",
                        border: "1px solid white",
                        cursor: "pointer",
                      }}
                      onClick={handleUpdateCourse}
                    >
                      <Link
                        to={{
                          pathname: `/api/courses/${course._id}`,
                          state: {
                            teacherInfo: course.teacherInfo[0].name,
                            teacherPic: course.teacherInfo[0].pic,
                          },
                        }}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Update
                      </Link>
                    </button>
                    <button
                      style={{
                        marginRight: "10px",
                        backgroundColor: "red",
                        padding: "10px",
                        borderRadius: "15px",
                        border: "1px solid white",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCourseDelete(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default MyCourses;
