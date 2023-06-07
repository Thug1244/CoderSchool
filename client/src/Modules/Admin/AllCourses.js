import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);

  const token = parsedData.token;

  const role = parsedData.role;

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleCourseDelete = async () => {
    try {
      if (selectedCourse) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`/api/courses/${selectedCourse._id}`, config);
        setCourses(
          courses.filter((course) => course._id !== selectedCourse._id)
        );
        setSelectedCourse(null);
        toast.success("Course deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast.error("Failed to delete course");
    }
  };

  const handleDeleteConfirmation = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseConfirmation = () => {
    setSelectedCourse(null);
  };

  return (
    <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <ToastContainer />
      <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
        <Typography variant="h2" align="center" style={{ color: "#da4ea2" }}>
          Want to learn something new?
        </Typography>
        <Typography variant="h2" align="center" style={{ color: "#da4ea2" }}>
          Enroll Now
        </Typography>
        <img
          src="./Images/smallLine.png"
          alt="smallLine"
          style={{ width: "30%", margin: "auto", display: "block" }}
        />

        <Grid container spacing={3} style={{ marginTop: "50px" }}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Paper
                elevation={3}
                style={{ padding: "20px", position: "relative" }}
              >
                {role === "Admin" && (
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      zIndex: "999",
                    }}
                    onClick={() => handleDeleteConfirmation(course)}
                  >
                    Delete
                  </Button>
                )}
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
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    style={{ width: "100%" }}
                  />
                  <Typography variant="h5" style={{ marginTop: "10px" }}>
                    {course.title}
                  </Typography>
                </Link>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  {course.description}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src={course.teacherInfo[0].pic}
                    alt={course.teacherInfo[0].name}
                    style={{
                      width: "50px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    style={{ display: "inline-block" }}
                  >
                    Uploaded by {course.teacherInfo[0].name}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={Boolean(selectedCourse)}
          onClose={handleCloseConfirmation}
        >
          <DialogTitle>
            <h2 style={{ color: "red" }}>Delete Course</h2>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this course?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCourseDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AllCourses;
