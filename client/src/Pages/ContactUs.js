import React from "react";
import "../Authentication/Login.css";
const ContactUs = () => {
  return (
    <div className="login-signup-main">
      <h2 style={{ paddingTop: "15px", fontSize: "28px" }}>Drop us a line</h2>
      <div
        style={{
          margin: "5%",
          padding: "25px 0px",
          display: "flex",
        }}
      >
        <form action="https://formspree.io/f/meqwjeyz" method="post">
          <label htmlFor="fname">First Name:</label>
          <input
            name="firstname"
            type="text"
            id="fname"
            autoComplete="off"
            required
          />
          <br />
          <label htmlFor="lname">Last Name:</label>
          <input
            name="lastname"
            type="text"
            id="lname"
            autoComplete="off"
            required
          />
          <br />

          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            autoComplete="off"
            required
          />
          <br />
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            id="message"
            autoComplete="off"
            required
            style={{
              minWidth: "32%",
              fontSize: "16px",
              display: "flex",
              borderRadius: "5px",
            }}
          />
          <br />

          <div className="secandorybuttonclass">
            <button className="secandorybutton" type="submit">
              Submit
            </button>
          </div>
        </form>
        <img
          src="./Images/contactUs.png"
          alt="contactUs"
          className="contactUs"
        />
      </div>
    </div>
  );
};

export default ContactUs;
