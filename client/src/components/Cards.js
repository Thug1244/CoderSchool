import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 1012px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Card = styled.div`
  width: 450px ;
  height: 254px;
  background: #07182E;
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
  justify-content: space-around;
  margin-right: 10px;
  background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
  
  @media only screen and (max-width: 768px) {
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 1012px) {
    margin-bottom: 60px;
  }
  
`;

const CardTitle = styled.h2`
  z-index: 1;
  color: white;
  font-size: 2em;
`;

const CardContent = styled.p`
  color: white;
`;

const Line = styled.img`
  height: 25px;
  width: 500px;
  color: white;
`;


export default function Cards() {
  const languages = [    { title: 'Python', description: 'Python is a high-level programming language.' },    { title: 'C++', description: 'C++ is a powerful, high-performance language.' },    { title: 'JavaScript', description: 'JavaScript is a programming language used to create interactive effects within web browsers.' },  ];

  return (
    <Section>
      {languages.map((language, index) => (
        <Card key={index}>
          <CardTitle>{language.title}</CardTitle>
          <Line src="./Images/line2.png" />
          <CardContent>{language.description}</CardContent>
        </Card>
      ))}
    </Section>
  );
}
