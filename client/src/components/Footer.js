import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  text-align: center;

  @media (min-width: 768px) {
    width: 25%;
    text-align: left;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Line = styled.img`
  height: auto;
  width: 100%;
  color: white;
`;

const CopyRight = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Line src="./Images/line2.png" />
      <Row>
        <Column>
          <Title>Code School</Title>
          <p>
            Code School is providing the easiest and addictive ways to learn
            different programming languages for free. We will help you to be a
            master in your faviroute language.
          </p>
        </Column>
        <Column>
          <Title>Pages</Title>
          <Link href="/">Home</Link>
          <Link href="/privacypolicy">Privacy Policy</Link>
          <Link href="/termsandconditions">Terms & Conditions</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/aboutus">About Us</Link>
          <Link href="/contactus">Contact Us</Link>
        </Column>
        <Column>
          <Title>Courses</Title>
          <Link href="http://localhost:3000/api/courses/6473797dd35250b64975348f">
            Python
          </Link>
          <Link href="http://localhost:3000/api/courses/647392d6d35250b6497538a5">
            Java
          </Link>
          <Link href="http://localhost:3000/api/courses/64737dacd35250b6497535c7">
            C#
          </Link>
          <Link href="http://localhost:3000/api/courses/64737faed35250b64975365a">
            HTML/CSS
          </Link>
        </Column>
        <Column>
          <Title>Get Started</Title>
          <Link href="/auth">Register</Link>
          <Link href="/login">Signin</Link>
          <Link href="/contactus">Support</Link>
        </Column>
      </Row>

      <CopyRight>© 2023 Code School. All rights reserved.</CopyRight>
    </FooterContainer>
  );
};

export default Footer;
