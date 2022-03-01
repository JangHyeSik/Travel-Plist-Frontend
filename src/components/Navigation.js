import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <GoBackButton onClick={() => navigate(-1)}>⬅️</GoBackButton>
      <NavigationWrapper>
        <StyledNavLink to="/mytravels">나의 여행✈️</StyledNavLink>
        <StyledNavLink to="/mydiarys">나의 기록📖</StyledNavLink>
      </NavigationWrapper>
    </>
  );
}

const GoBackButton = styled.button`
  position: absolute;
  top: 2%;
  left: 2%;
  font-size: 3rem;
  background-color: transparent;
  border: none;
`;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 20vh;
  background-color: #9cbdf0;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 3rem;
  color: #ffffff;
`;
