import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
//import ChatHome from "./Modules/Chatting/ChatHome";
import RegistrationForm from "./Authentication/ReistrationForm";
import Login from "./Authentication/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatMain from "./Modules/Chatting/ChatMain";
import ContactUs from "./Pages/ContactUs";
import OnlineCompiler from "./Modules/Compiler/OnlineCompiler";
import Community from "./Modules/Community/Community";
import QuestionDetails from "./Modules/Community/QuestionDetails";
import AskQuestion from "./Modules/Community/AskQuestion";
import Dashboard from "./Modules/Dashboard/Dashboard";
import UploadCourses from "./Modules/Courses/UploadCourses";
import ShowCourses from "./Modules/Courses/ShowCourses";
import CourseDetails from "./Modules/Courses/CourseDetails";
import MyCourses from "./Modules/Courses/MyCourses";
import AllCourses from "./Modules/Admin/AllCourses";
import AllTeachers from "./Modules/Admin/AllTeachers";
import AllStudents from "./Modules/Admin/AllStudents";
import AboutUs from "./Pages/AboutUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsandConditions from "./Pages/TermsandConditions";
import Disclaimer from "./Pages/Disclaimer";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<RegistrationForm />} />
          <Route path="login" element={<Login />} />
          <Route path="chat" element={<ChatMain />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="compiler" element={<OnlineCompiler />} />
          <Route path="community" element={<Community />} />
          <Route path="askQuestion" element={<AskQuestion />} />
          <Route path="/api/community/:postId" element={<QuestionDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/uploadCourses" element={<UploadCourses />} />
          <Route path="/ShowCourses" element={<ShowCourses />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/AllCourses" element={<AllCourses />} />
          <Route path="/AllTeachers" element={<AllTeachers />} />
          <Route path="/AllStudents" element={<AllStudents />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsandConditions" element={<TermsandConditions />} />
          <Route path="/Disclaimer" element={<Disclaimer />} />
          <Route path="/api/courses/:courseId" element={<CourseDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
