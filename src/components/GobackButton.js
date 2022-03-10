import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function GoBackButton() {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(-1)}>⬅️</Button>;
}

const Button = styled.button`
  position: absolute;
  top: 3%;
  left: 3%;
  z-index: 11;
  font-size: 3rem;
  background-color: transparent;
  border: none;
`;
