import React, { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  height: 80vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 38px;
  color: white;
  @media only screen and (max-width: 768px) {
    text-align: center;
  }

  span::before {
    content: "Python";
    animation: animate infinite 10s;
    padding-left: 10px;
    position: visible;
    color: #da4ea2;
  }
  @keyframes animate {
    0% {
      content: "Java";
    }

    25% {
      content: "ReactJS";
    }

    50% {
      content: "C Sharp";
    }

    75% {
      content: "C++";
    }

    100% {
      content: "HTML/CSS";
    }
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
  @media only screen and (max-width: 768px) {
    padding: 10px;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  font-weight: 500;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 2;

  position: relative;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <>
      <Section>
        <Container>
          <Left>
            <Title>
              {" "}
              <h2 style={{ textAlign: "left" }}>
                Become<span></span> <br></br>Developer
              </h2>
            </Title>
            <WhatWeDo>
              <Line src="./Images/line.png" />
              <Subtitle>What we Do</Subtitle>
            </WhatWeDo>
            <Desc>
              <p>
                Start your coding experience here and make yourself<br></br>{" "}
                biggner to advanced level programmer<br></br>Build Yours apps
                and websites today
              </p>
            </Desc>
            <Button onClick={handleLoginClick}>Get Started</Button>
          </Left>
          <Right>
            {/*
            <Canvas>
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={1} />
                <directionalLight position={[3, 2, 1]} />
                <Sphere args={[1, 100, 200]} scale={2.4}>
                  <MeshDistortMaterial
                    color="#3d1c56"
                    attach="material"
                    distort={0.5}
                    speed={2}
                  />
                </Sphere>
              </Suspense>
            </Canvas>
  */}
            <img src="./Images/hero.gif" alt="heroImage" />
          </Right>
        </Container>
      </Section>
    </>
  );
};

export default HeroSection;
