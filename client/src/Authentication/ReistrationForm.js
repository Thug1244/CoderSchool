import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  //Validation the registration
  const [emailError, setEmailError] = useState("");
  const [NameError, setNameError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [CPasswordError, setCPasswordError] = useState("");
  const [picError, setpicError] = useState("");
  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);
  //const token = parsedData.token;

  const postDetails = (pics) => {
    setLoading(true);
    setPic(pics);
    if (pic === undefined) {
      setpicError("Invalid file format");
      return;
    }
    setpicError("");

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Code School");
      data.append("cloud_name", "talha1244");
      fetch("https://api.cloudinary.com/v1_1/talha1244/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url);

          // console.log("pic:", pic);
          setLoading(false);
          // console.log("data.url:", data.url);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail.com$/)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");

    if (!name.match(/^[A-Za-z0-9]{3,16}$/)) {
      setNameError(
        "Username must be between 3 and 16 characters, and contain only letters and numbers"
      );
      return;
    }
    setNameError("");

    if (
      !password.match(
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
      )
    ) {
      setPasswordError(
        `Password should be 8-20 characters and include at least 1 letter,
         1 number and 1 special character!`
      );
      return;
    }

    setPasswordError("");

    if (password !== cpassword) {
      setCPasswordError("Passwords do not match");
      return;
    }
    setCPasswordError("");

    setLoading(true);

    try {
      const config = {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/auth",
        { name, email, password, pic, role },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data.role);
      setLoading(false);
      // toast.success("Registration Successful");
      window.alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credientials!", error);

      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    const value = e.target.value.toString();
    setRole(value);
    console.log(value);
  };

  return (
    <div className="login-signup-main">
      <ToastContainer />
      <h2>Don't have an Account</h2>
      <h2>Signup Now</h2>
      <div className="card">
        <img
          src="./Images/signup.png"
          alt="Signupimage"
          className="loginsignupimage"
        />
        <form method="POST" id="register-form">
          <label htmlFor="username">Username:</label>
          <input
            name="name"
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {NameError && <p className="error">{NameError}</p>}
          <br />

          <label htmlFor="email">Email:</label>
          <input
            placeholder="abc1234@gmail.com"
            name="email"
            type="email"
            value={email}
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="password">Password:</label>
          <input
            placeholder="at least 8 characters, including at least 1 letter and 1 number"
            name="password"
            type="password"
            value={password}
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {PasswordError && <p className="error">{PasswordError}</p>}
          <br />
          <label htmlFor="cpassword">Confirm Password:</label>
          <input
            name="cpassword"
            type="password"
            value={cpassword}
            id="cpassword"
            autoComplete="off"
            onChange={(e) => setCpassword(e.target.value)}
            required
          />
          {CPasswordError && <p className="error">{CPasswordError}</p>}
          <br />
          <label htmlFor="pic">Upload Your Profile Picture:</label>
          <input
            name="profilePicture"
            type="file"
            id="file"
            defaultValue={pic}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            required
          />
          {picError && <p className="error">{picError}</p>}
          <br />
          <div className="userRole">
            <label htmlFor="role">Role:</label>
            <select name="role" id="role" onChange={handleRoleChange}>
              <option value="student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="secandorybutton"
            disabled={loading}
            onClick={submitHandler}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p className="paragraph">
            {/*loading && <p>Loading...</p>*/}
            Already have an Account?{" "}
            <NavLink className="login-signup-toggle" to="/login">
              Login Now
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
