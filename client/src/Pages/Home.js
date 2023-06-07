import React from "react";
import "../App.css";
import CompilerFeature from "../components/CompilerFeature";
import HeroSection from "../components/HeroSection";
import Who from "../components/Who";
import CoursesSection from "../components/CoursesSection";
import styled from "styled-components";
import ChattingFeature from "../components/ChattingFeature";
import Community from "../components/Community";

const Container = styled.div`
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
`;

function Home() {
  return (
    <div className="App">
      <Container>
        <HeroSection />
        <Who />
        <CompilerFeature />
        <CoursesSection />
        <ChattingFeature />
        <Community />
      </Container>
    </div>
  );
}

export default Home;
