import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  @media only screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-size: 74px;
  color: white;
  @media only screen and (max-width: 768px) {
    font-size: 60px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100px;
  height: auto;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 768px) {
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #da4ea2;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  font-weight: 500;
  width: 120px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CompilerFeature = () => {
  const navigate = useNavigate();
  const handleCompilerClick = () => {
    navigate("/compiler");
  };
  return (
    <Section>
      <Container>
        <Left>
          <Title>No need to download Compiler now</Title>
          <WhatWeDo>
            <Line src="./Images/line.png" />
            <Subtitle>Online Compiler</Subtitle>
          </WhatWeDo>
          <Desc>
            With our online Compiler you can compiler your codes directly here.
            There is no need to download any compiler now.
          </Desc>
          <Button onClick={handleCompilerClick}>Use Compiler</Button>
        </Left>
        <Right>
          <img src="./Images/compiler.gif" alt="compilergif" />
        </Right>
      </Container>
    </Section>
  );
};

export default CompilerFeature;
