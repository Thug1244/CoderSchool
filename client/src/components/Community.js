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
  padding-bottom: 150px;

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



const Community = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Title>Join The World Largest Community Now</Title>
          <WhatWeDo>
            <Line src="./Images/line.png" />
            <Subtitle>Discussion Forum</Subtitle>
          </WhatWeDo>
          <Desc>
           Join The World Largest Community now and participate in different discussions and help eachother to solve different Errors.
          </Desc>
       
        </Left>
        <Right>
        <img src="./Images/community.gif" alt="communitygif"/>
        </Right>
      </Container>
    </Section>
  );
};

export default Community;
