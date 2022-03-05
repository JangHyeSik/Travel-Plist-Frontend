import React from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../Navigation";

export default function TravelDetail() {
  const { travelid } = useParams();
  const { travels } = useSelector((state) => state.user.user);

  const travel = travels.find((travel) => travel._id === travelid);
  const { title, startDate, travelLogs } = travel;
  return (
    <TravelDetailWrapper>
      <div className="empty-space"></div>
      <div className="travel-detail-title">{title}의 일정</div>
      <TravelLogWrapper>
        {travelLogs.map((travelLog, index) => {
          const start = new Date(startDate.slice(0, 16));
          start.setDate(start.getDate() + index);

          const end = new Date(start);
          if (index !== travelLogs.length - 1) {
            end.setDate(end.getDate() + 1);
          }

          return (
            <TravelDetailBoxWrapper key={travelLog._id}>
              <div className="travel-date">{`${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`}</div>
              <Div isEnd={new Date() > end}>
                <NavLinkWrapper
                  to={`/travel-detail-create/${travel._id}/${travelLog._id}`}
                >
                  {index + 1}일차
                </NavLinkWrapper>
                <NavLinkWrapper
                  to={`/travel-diary-create/${travel._id}/${travelLog._id}`}
                >
                  ✏️
                </NavLinkWrapper>
              </Div>
            </TravelDetailBoxWrapper>
          );
        })}
      </TravelLogWrapper>
      <Navigation />
    </TravelDetailWrapper>
  );
}

const TravelDetailWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #d4e3fc;

  .empty-space {
    height: 7%;
  }

  .travel-detail-title {
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

const TravelLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
  height: 60%;
  font-size: 2rem;
  font-weight: bold;
`;

const TravelDetailBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .travel-date {
    margin-left: 1rem;
    margin-bottom: 3rem;
    font-size: 2.2rem;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;
  padding: 2rem 10rem;
  border-radius: 4rem;
  background-color: #ffffff;
  font-size: 3rem;
  opacity: ${(props) => (props.isEnd ? "30%" : "100%")};
`;

const NavLinkWrapper = styled(NavLink)`
  text-decoration: none;
`;
