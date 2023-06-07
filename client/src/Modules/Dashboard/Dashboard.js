import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Dashboard.css";
import { useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import axios from "axios";
import { TeacherData } from "./TeacherData";
import { AdminData } from "./AdminData";
function Dashboard(props) {
  const [sidebar, setSidebar] = useState(false);
  const [comments, setComments] = useState({});
  const { userId } = useParams(); // Retrieve user ID from URL parameter
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [authorIds, setAuthorIds] = useState(null);

  const showSidebar = () => setSidebar(!sidebar);
  const storedData = localStorage.getItem("userInfo");
  //console.log(userData.role);
  const parsedData = JSON.parse(storedData);
  const token = parsedData.token;
  const Id = parsedData._id;
  //console.log(Id);
  // console.log(token);
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
        const questions = await axios.get(`/api/community/questions/${Id}`);
        setPosts(questions.data);
        //console.log(questions.data);
        //console.log(questions.data.map((comment) => comment.author));
        //console.log(questions.data.map((question) => question.title));
        const authorIds = questions.data.map((comment) => comment.author);
        //setAuthorIds(authorIds.data);
        setAuthorIds(authorIds.length);
        //console.log(authorIds);
        //console.log(comments);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {/* Sidebar */}
      <IconContext.Provider value={{ color: "#da4ea2" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
            })}
            {TeacherData.map((item, index) => {
              if (userData && userData.role === "Teacher") {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              } else {
                // Return null if the user role is not "teacher" or "admin"
                return null;
              }
            })}
            {AdminData.map((item, index) => {
              if (userData && userData.role === "Admin") {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              } else {
                // Return null if the user role is not "teacher" or "admin"
                return null;
              }
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      {/* 2nd Column */}
      <div className="dashboard">
        <div>
          <div className="dashboardMainCard">
            <div className="dashboardMainCardleft">
              <h2>Welcome back to Code School</h2>
              <div>
                <p>
                  Learn something new today with the most attractive and new way
                </p>
                <p>
                  Our courses are designed by industry experts who have years of
                  experience in the field.
                </p>

                <p style={{ color: "#da4ea2" }}>New Day New Journey</p>
              </div>
            </div>
            <div className="dashboardMainCardRight">
              <img src="./Images/hand.png" alt="hand" />
            </div>
          </div>
          <div className="dashboardBottomCards">
            <div className="dashboardSecandoryCards">
              <h2 style={{ textAlign: "center", paddingTop: "10px" }}>
                Questions Asked
              </h2>
              <div className="progressiveBar">
                <CircularProgressbar
                  value={posts ? posts.length : 0}
                  maxValue={100}
                  text={`${posts ? posts.length : 0}`}
                  styles={buildStyles({
                    pathColor: "#da4ea2",
                    textColor: "#da4ea2",
                    trailColor: "#fff",
                  })}
                />
              </div>

              <div className="insideSecandoryCards">
                {/*{posts.map((post) => (
      <h3 key={post.id} className="moreInsideSecandoryClass">
        {post.title}
      </h3>
    ))}*/}
              </div>
            </div>

            <div className="dashboardSecandoryCards">
              <h2 style={{ textAlign: "center", paddingTop: "10px" }}>
                Answers gave
              </h2>
              <div className="progressiveBar">
                <CircularProgressbar
                  value={authorIds ? authorIds : 0}
                  maxValue={100}
                  text={`${authorIds ? authorIds : 0}`}
                  styles={buildStyles({
                    pathColor: "#da4ea2",
                    textColor: "#da4ea2",
                    trailColor: "#fff",
                  })}
                />
              </div>

              <div className="insideSecandoryCards"></div>
            </div>
          </div>
        </div>

        {/* 3rd Column */}
        <div className="dashboardProfile">
          <div>
            {userData ? (
              <div>
                <img
                  src={userData.pic}
                  alt="userPic"
                  style={{
                    width: "40%",
                    borderRadius: "50%",
                    marginLeft: "30%",
                    marginBottom: "5%",
                  }}
                />
                <div style={{}}>
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
                      {userData.name}
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
                      {userData.email}
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
                      Role:
                    </b>
                    <p style={{ marginLeft: "20px", display: "inline-flex" }}>
                      {userData.role}
                    </p>
                  </p>
                  <p style={{ paddingLeft: "20px" }}>
                    <b style={{ color: "#da4ea2", display: "inline-flex" }}>
                      Id:
                    </b>
                    <p style={{ marginLeft: "20px", display: "inline-flex" }}>
                      {userData._id}
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
    </div>
  );
}

export default Dashboard;
