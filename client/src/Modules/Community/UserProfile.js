import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { userId } = useParams(); // Retrieve user ID from URL parameter
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/community/user/${userId}`); // Fetch user data using user ID
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);
  //console.log(userData);
  // Render user data
  return (
    <div>
      {userData ? (
        <div>
          <h2>User Data</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Render other user data fields */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
