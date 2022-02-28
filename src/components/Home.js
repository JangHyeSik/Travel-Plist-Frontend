import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginRequest } from "../features/auth/authSlice";
import { auth, signInWithGoogle } from "../firebase";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  auth.onAuthStateChanged((user) => {
    if (user) {
      const { email, displayName } = user;

      if (!isLoggedIn) {
        dispatch(loginRequest({ email, displayName }));
      }

      navigate("/main");
    }
  });

  return (
    <AuthWrapper>
      <div className="travel-plist-title">Travel Plist</div>
      <button className="login-button" onClick={signInWithGoogle}>
        Google Login
      </button>
    </AuthWrapper>
  );
}

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .travel-plist-title {
    font-size: 7.5rem;
  }
  .login-button {
    cursor: pointer;
    padding: 1.5rem 10rem;
    border-radius: 10px;
    border: none;
  }
`;