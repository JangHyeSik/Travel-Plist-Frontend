import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
  return (
    <NavigationWrapper>
      <StyledNavLink to="/main">
        <div>🏠</div>
        <div>홈 화면</div>
      </StyledNavLink>
      <StyledNavLink to="/mytravels">
        <div>✈️</div>
        <div>나의 여행</div>
      </StyledNavLink>
      <StyledNavLink to="/mydiarys">
        <div>📖</div>
        <div>나의 기록</div>
      </StyledNavLink>
    </NavigationWrapper>
  );
}

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20vh;
  background-color: #9cbdf0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  text-decoration: none;
  color: #ffffff;
`;
