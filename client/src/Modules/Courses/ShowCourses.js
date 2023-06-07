import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const ShowCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    // Filter the courses based on the search query
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
        <Typography variant="h2" align="center" style={{ color: "#da4ea2" }}>
          Want to learn something new?
        </Typography>
        <Typography variant="h2" align="center" style={{ color: "#da4ea2" }}>
          Enroll Now
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50vh",
          }}
        >
          <video
            src="https://res.cloudinary.com/talha1244/video/upload/v1685215785/My_Video3_qvwhlo.mp4"
            alt="helping video"
            controls
            style={{ maxWidth: "50%", maxHeight: "80%" }}
          />
        </div>

        <img
          src="./Images/smallLine.png"
          alt="smallLine"
          style={{ width: "30%", margin: "auto", display: "block" }}
        />
        <h2 style={{ color: "#da4ea2" }}>Search Courses Here</h2>
        <TextField
          label="Search courses"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          style={{ marginBottom: "20px" }}
        />

        <Grid container spacing={3} style={{ marginTop: "50px" }}>
          {(searchQuery !== "" ? filteredCourses : courses).map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Paper
                elevation={3}
                style={{ padding: "20px", position: "relative" }}
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
      </Container>
    </div>
  );
};

export default ShowCourses;
