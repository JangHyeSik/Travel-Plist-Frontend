import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
  return (
    <NavigationWrapper>
      <StyledNavLink to="/main">
        <div>π </div>
        <div>ν νλ©΄</div>
      </StyledNavLink>
      <StyledNavLink to="/mytravels">
        <div>βοΈ</div>
        <div>λμ μ¬ν</div>
      </StyledNavLink>
      <StyledNavLink to="/mydiarys">
        <div>π</div>
        <div>λμ κΈ°λ‘</div>
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
  font-family: "SuncheonB";
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  text-decoration: none;
  color: #ffffff;
`;
