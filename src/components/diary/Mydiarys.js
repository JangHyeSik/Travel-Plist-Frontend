import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../Navigation";
import { auth } from "../../firebase";

export default function Mydiarys() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { username, travels } = user;

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <MydiarysWrapper>
      <UserInfoContainer>
        <div className="character-container">
          <img
            className="character"
            src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
            alt="캐릭터"
          />
        </div>
        <div className="username-container">{username} 님</div>
        <button className="logout-button" onClick={signOut}>
          로그아웃
        </button>
      </UserInfoContainer>
      <div className="title">나의 기록📖 </div>
      <MyDiarysContainer>
        {travels.map((travel) => {
          const { title, travelLogs } = travel;
          const startDate = travel.startDate.slice(0, 10);
          const endDate = travel.endDate.slice(0, 10);

          return (
            <div key={travel._id} className="container">
              <div className="travel-title">
                <div>{title}</div>
                <div className="travel-date">
                  {startDate} ~ {endDate}
                </div>
              </div>
              <div className="flex">
                {travelLogs.map((travelLog, index) => {
                  const { travelPlaces, travelDiary } = travelLog;

                  const start = new Date(startDate.slice(0, 16));
                  start.setDate(start.getDate() + index);
                  start.setHours(0, 0, 0, 0);

                  const isLastTime = new Date() > start;

                  return (
                    <div key={travelLog._id} className="travel-box-container">
                      {travelPlaces.map((travelPlace, index) => {
                        return (
                          <div key={index}>
                            <div className="travel-box">
                              <div
                                onClick={() =>
                                  navigate(
                                    `/travels/${travel._id}/${travelLog._id}/${travelDiary._id}`
                                  )
                                }
                                className="picture"
                              >
                                {isLastTime ? "사진" : "자물쇠"}
                              </div>
                              <div className="trave-plcae">{travelPlace}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </MyDiarysContainer>
      <Navigation />
    </MydiarysWrapper>
  );
}

const MydiarysWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #d4e3fc;

  .title {
    display: flex;
    align-items: center;
    height: 7%;
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
  height: 10%;
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

const MyDiarysContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: 60%;
  font-size: 1rem;
  font-weight: bold;
  overflow: scroll;

  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .flex {
    display: flex;
  }

  .travel-title {
    display: flex;
    align-items: center;
    margin-top: 3rem;
    margin-left: 1rem;
    font-size: 2.5rem;
  }
  .travel-date {
    margin-left: 2rem;
  }
  .travel-box-container {
    display: flex;
  }
  .travel-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 6rem 0rem 3rem 4rem;
    font-size: 2rem;
  }
`;
