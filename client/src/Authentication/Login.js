import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault(); // prevent default form submission behavior
    console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      //console.log(JSON.stringify(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Welcome Back!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credientials!");
    }
  };

  return (
    <div className="login-signup-main">
      <ToastContainer />
      <h2>Welcome Back</h2>
      <h2>Login Now</h2>
      <div className="card">
        <img
          src="./Images/signup.png"
          alt="LoginImage"
          className="loginsignupimage"
        />
        <form method="POST" id="register-form" onSubmit={submitHandler}>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <button type="submit" className="secandorybutton">
            Login
          </button>
          <p className="paragraph">
            Don't have an account?{" "}
            <NavLink className="login-signup-toggle" to="/auth">
              Signup Now
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
