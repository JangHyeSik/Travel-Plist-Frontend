import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../Navigation";
import { auth } from "../../firebase";
import { logoutRequest } from "../../features/auth/authSlice";

export default function Mytravels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, travels } = useSelector((state) => state.user.user);

  const signOut = () => {
    auth.signOut();
    sessionStorage.removeItem("persist:root");
    sessionStorage.removeItem("token");

    dispatch(logoutRequest());
    navigate("/");
  };

  return (
    <MytravelsWrapper>
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
        <LogoutButton className="logout-button" onClick={signOut}>
          로그아웃
        </LogoutButton>
      </UserInfoContainer>

      <div className="title">나의 여행 ✈️</div>
      <MytravelsContainer>
        {travels.length ? (
          travels.map((travel) => {
            const startDate = travel.startDate.slice(0, 10);
            const endDate = travel.endDate.slice(0, 10);

            return (
              <div key={travel._id}>
                <div className="travel-date">
                  {startDate} ~ {endDate}
                </div>
                <TravelBoxNavLink to={`/travel-detail/${travel._id}`}>
                  {travel.title}
                </TravelBoxNavLink>
              </div>
            );
          })
        ) : (
          <>
            <div>여행 일정이 없습니다.</div>
          </>
        )}
        <TravelCreateButton
          className="travel-create-button"
          onClick={() => navigate("/travel-create")}
        >
          +
        </TravelCreateButton>
      </MytravelsContainer>
      <Navigation />
    </MytravelsWrapper>
  );
}

const MytravelsWrapper = styled.div`
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
  justify-content: space-around;
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
  height: 57%;
  font-size: 2rem;
  font-weight: bold;
  overflow: scroll;

  .travel-date {
    margin-top: 2.5rem;
    font-size: 2.5rem;
  }
`;

const TravelCreateButton = styled.button`
  margin-top: 2rem;
  padding: 2rem 25rem;
  border: none;
  font-size: 5rem;
  color: #aaaaaa;
  opacity: 70%;
`;

const TravelBoxNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 50rem;
  padding: 3rem;
  border-radius: 4rem;
  font-size: 2.3rem;
  background-color: #ffffff;
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
