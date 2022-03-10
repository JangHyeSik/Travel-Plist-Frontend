import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
  return (
    <NavigationWrapper>
      <StyledNavLink to="/mytravels">나의 여행✈️</StyledNavLink>
      <StyledNavLink to="/mydiarys">나의 기록📖</StyledNavLink>
    </NavigationWrapper>
  );
}

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
