import React from "react";
import styled from "styled-components";



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
  padding-top: 10%;
  @media only screen and (max-width: 768px) {
    display: none;
  }
  @media only screen and (max-width: 1012px) {
    padding-top: 40%;
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
  padding-top: 0px;

  @media only screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
    padding-bottom: 50vh;
  }

  @media only screen and (max-width: 1012px) {
    align-items: center;
    text-align: center;
    padding-top: 50vh;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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


const ChattingFeature = () => {
  return (
    <Section>
      <Container>
        <Left>
          <img src="./Images/Chatting.png" alt="chatting"/>
        </Left>
        <Right>
          <Title>Get Connected With Friends</Title>
          <WhatWeDo>
            <Line src="./Images/line.png" />
            <Subtitle>Chatting Feature</Subtitle>
          </WhatWeDo>
          <Desc>
            With our Chatting feature you can easily communicate with your friends and discuss different codes and projects easily.
          </Desc>
        </Right>
      </Container>
    </Section>
  );
};

export default ChattingFeature;
