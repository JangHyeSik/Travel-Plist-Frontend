import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginRequest } from "../features/auth/authSlice";
import { auth, signInWithGoogle } from "../firebase";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, displayName } = user;

        if (!isLoggedIn) {
          dispatch(loginRequest({ email, displayName }));
        }

        navigate("/main");
      }
    });
  }, []);

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
  height: 88vh;
  background-color: #d4e3fc;

  .travel-plist-title {
    font-size: 9rem;
    color: #ffffff;
  }
  .login-button {
    margin-top: 10rem;
    margin-bottom: 3rem;
    padding: 2rem 10rem;
    border: none;
    border-radius: 10px;
    font-size: 2.5rem;
    font-weight: bold;
    background-color: #9cbdf0;
    color: #ffffff;
  }
`;
