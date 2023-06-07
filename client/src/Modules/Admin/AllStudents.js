import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
}));

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);
  const token = parsedData.token;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/user/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (userId) => {
    setSelectedUserId(userId);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/user/${selectedUserId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Refresh the list of students after successful deletion
        const updatedStudents = students.filter(
          (student) => student._id !== selectedUserId
        );
        setStudents(updatedStudents);
      } else {
        console.log("Error deleting user");
      }
    } catch (error) {
      console.log(error);
    }

    // Close the confirmation dialog
    setDeleteConfirmationOpen(false);
    setSelectedUserId(null);
  };

  const cancelDelete = () => {
    // Close the confirmation dialog
    setDeleteConfirmationOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="container">
      <h2 className="mt-4">All Students</h2>
      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item key={student._id} xs={12} sm={6} md={4}>
            <StyledCard>
              <CardMedia
                component="img"
                height="280"
                image={student.pic}
                alt={student.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {student.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {student.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role: {student.role}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(student._id)}
              >
                Delete
              </Button>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-confirmation-dialog-title"
      >
        <DialogTitle
          id="delete-confirmation-dialog-title"
          style={{ color: "red" }}
        >
          Are you sure you want to remove the student from the website?
        </DialogTitle>
        <DialogContent>
          {/* Additional content can be added here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllStudents;
