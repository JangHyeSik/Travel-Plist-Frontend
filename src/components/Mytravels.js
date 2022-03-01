import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Navigation";
import { auth } from "../firebase";

export default function Mytravels() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <MytravelsWrapper>
      <UserInfoContainer>
        <div className="character-container">
          <img
            className="character"
            src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
            alt="캐릭터"
          />
        </div>
        <div className="username-container">{user.username} 님</div>
        <button className="logout-button" onClick={signOut}>
          로그아웃
        </button>
      </UserInfoContainer>

      <div className="mytravels-title">나의 여행 ✈️</div>
      <MytravelsContainer>
        {user.travels.length ? (
          user.travels.map((travel) => {
            <div>{travel.title}</div>;
          })
        ) : (
          <>
            <div>여행 일정이 없습니다.</div>
            <button className="travel-create-button">+</button>
          </>
        )}
      </MytravelsContainer>
      <Navigation />
    </MytravelsWrapper>
  );
}

const MytravelsWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #d4e3fc;

  .mytravels-title {
    display: flex;
    align-items: center;
    height: 10%;
    padding-left: 2rem;
    border-radius: 4rem;
    background-color: #9cbdf0;
    font-size: 3rem;
    font-weight: bold;
    color: #ffffff;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 13%;
  font-size: 3rem;
  font-weight: bold;

  .character-container {
    width: 8rem;
    height: 9rem;
    overflow: hidden;
  }

  .character {
    width: 32rem;
  }
`;

const MytravelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: 60%;
  font-size: 2rem;
  font-weight: bold;

  .travel-create-button {
    cursor: pointer;
    margin-top: 2rem;
    padding: 2rem 25rem;
    border: none;
    font-size: 5rem;
    color: #aaaaaa;
    opacity: 70%;
  }

  .travel-create-button:hover {
    font-size: 5.5rem;
  }
`;
