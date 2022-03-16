import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../Navigation";
import { auth } from "../../firebase";
import { logoutRequest } from "../../features/auth/authSlice";

export default function Mydiarys() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { username, travels } = user;

  const signOut = () => {
    auth.signOut();
    sessionStorage.removeItem("persist:root");
    sessionStorage.removeItem("token");

    dispatch(logoutRequest());
    navigate("/");
  };

  return (
    <MydiarysWrapper>
      <UserInfoContainer>
        <Div>
          <div className="character-container">
            <img
              className="character"
              src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
              alt="캐릭터"
            />
          </div>
          <div className="username-container">{username} 님</div>
        </Div>
        <LogoutButton onClick={signOut}>로그아웃</LogoutButton>
      </UserInfoContainer>
      <div className="title">나의 기록📖 </div>
      <MyDiarysContainer>
        {travels.map((travel) => {
          const { title, travelLogs } = travel;
          const startDate = travel.startDate.slice(0, 10);
          const endDate = travel.endDate.slice(0, 10);

          return (
            <div key={travel._id} className="travel-container">
              <div className="travel-title">
                <div>{title}</div>
                <div className="travel-date">
                  {startDate} ~ {endDate}
                </div>
              </div>
              <div className="travel-log-container">
                {travelLogs.map((travelLog, index) => {
                  const { travelDiary } = travelLog;
                  const start = new Date(startDate.slice(0, 16));

                  start.setDate(start.getDate() + index);
                  start.setHours(0, 0, 0, 0);

                  const isLastTime = new Date() > start;

                  return (
                    <div key={travelLog._id} className="travel-box-container">
                      <div className="travel-box">
                        {isLastTime ? (
                          travelDiary.photoUrl ? (
                            <img
                              src={travelDiary.photoUrl}
                              alt="대표사진"
                              className="travel-diary-photo"
                              onClick={() =>
                                navigate(
                                  `/travels/${travel._id}/${travelLog._id}/${travelDiary._id}`
                                )
                              }
                            />
                          ) : (
                            <div
                              className="travel-diary-icon"
                              onClick={() =>
                                navigate(
                                  `/travels/${travel._id}/${travelLog._id}/${travelDiary._id}`
                                )
                              }
                            >
                              ✏️
                            </div>
                          )
                        ) : (
                          <div className="travel-diary-icon">🔒</div>
                        )}
                        <div className="travel-date-number">
                          {index + 1}일차
                        </div>
                      </div>
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
  font-family: "SuncheonB";

  .title {
    display: flex;
    align-items: center;
    height: 8%;
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
  justify-content: space-around;
  align-items: center;
  height: 13%;
  font-size: 3rem;
  font-weight: bold;

  .character-container {
    width: 8rem;
    height: 9rem;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  .character {
    width: 32rem;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-right: 7rem;
`;

const LogoutButton = styled.button`
  padding: 20px 45px;
  margin-right: 3rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #9cbdf0;
  color: #ffffff;
`;

const MyDiarysContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  height: 57%;
  font-size: 1rem;
  font-weight: bold;
  overflow: scroll;

  .travel-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .travel-log-container {
    display: flex;
    overflow: scroll;
  }

  .travel-title {
    display: flex;
    align-items: center;
    margin-top: 3rem;
    margin-left: 4rem;
    font-size: 2.5rem;
  }

  .travel-date {
    margin-left: 2rem;
  }

  .travel-box-container {
    display: flex;
    margin-right: 4rem;
    margin-left: 4rem;
  }

  .travel-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2.5rem 0rem;
  }

  .travel-diary-create {
    width: 100px;
    padding: 5rem;
    font-size: 3rem;
    background-color: #ffffff;
    opacity: 50%;
  }

  .travel-date-number {
    width: 7rem;
    padding: 1rem 4.5rem;
    font-size: 2rem;
    text-align: center;
    background-color: #ffffff;
  }

  .travel-diary-photo {
    width: 256px;
    height: 250px;
  }

  .travel-diary-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 250px;
    font-size: 3rem;
    background-color: #ffffff;
    opacity: 50%;
  }
`;
