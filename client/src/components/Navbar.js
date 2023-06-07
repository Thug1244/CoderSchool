import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Container = styled.div`
  width: 80%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  text-decoration: none;
`;

const Logo = styled.div`
  color: white;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
`;

const List = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;

  List:hover {
    transform: translateY(10%) l;
  }

  @media only screen and (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    flex-direction: column;
    gap: 20px;
    position: absolute;
    top: 80px;
    left: 0;
    width: 89%;
    padding: 20px;
    background-color: #da4ea2;
    z-index: 1;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  color: white;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #da4ea2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
const LogoText = styled.h2`
  text-decoration: none;
  margin: 0;
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 15px;
    right: 40px;
    width: 30px;
    height: 25px;
    z-index: 2;

    div {
      width: 100%;
      height: 3px;
      background-color: white;
      margin: 5px 0;
      transition: all 0.3s ease;
    }
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);
  const token = parsedData?.token;
  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleContactUsClick = () => {
    navigate("/contactUs");
  };
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleAboutUsClick = () => {
    navigate("/aboutUs");
  };
  const handlePrivacyPolicyClick = () => {
    navigate("/privacypolicy");
  };

  const handleTermsandConditionClick = () => {
    navigate("/termsandconditions");
  };

  const handleDisclaimerClick = () => {
    navigate("/disclaimer");
  };
  return (
    <Section>
      <Container>
        <Links>
          <Logo>
            <LogoText onClick={handleLogoClick}>Code School</LogoText>
          </Logo>
          <List open={open}>
            <ListItem onClick={handleLogoClick}>Home</ListItem>
            <ListItem onClick={handleAboutUsClick}>About Us</ListItem>
            <ListItem onClick={handlePrivacyPolicyClick}>
              Privacy Policy
            </ListItem>
            <ListItem onClick={handleTermsandConditionClick}>
              Terms and Coditions
            </ListItem>
            <ListItem onClick={handleDisclaimerClick}>Disclaimer</ListItem>

            <ListItem onClick={handleContactUsClick}>Contact Us</ListItem>
            {token && (
              <ListItem onClick={handleDashboardClick}>Dashboard</ListItem>
            )}
          </List>
        </Links>
        <Icons>
          {token ? (
            <Button onClick={handleLogoutClick}>Logout</Button>
          ) : (
            <Button onClick={handleLoginClick}>Login</Button>
          )}
          <Hamburger onClick={toggleMenu}>
            <div />
            <div />
            <div />
          </Hamburger>
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;
