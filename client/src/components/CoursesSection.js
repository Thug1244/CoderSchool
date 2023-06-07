import React from 'react'
import styled from "styled-components";
import Cards from './Cards';


const Section = styled.div`
  height: 60vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  text-align: center;
  @media only screen and (max-width: 768px) {
    height:100vh;
  }
  @media only screen and (max-width: 1012px) {
    height:150vh;
  }
`;

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  justify-content: space-between;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 74px;
  color: white;
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 60px;
  }
`;

const CoursesSection = () => {
  return (
    <Section>
        <Container>
            <Title> Our Courses </Title>
            <Cards/>
        </Container>
    </Section>
  )
}

export default CoursesSection