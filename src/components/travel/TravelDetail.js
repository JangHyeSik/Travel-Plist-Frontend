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
      <TravelLogContainerWrapper>
        <TravelLogWrapper>
          {travelLogs.map((travelLog, index) => {
            const start = new Date(startDate.slice(0, 16));
            start.setDate(start.getDate() + index);

            const end = new Date(start);

            if (index !== travelLogs.length - 1) {
              end.setDate(end.getDate() + 1);
            }

            const lastDayEnd = new Date(end);
            lastDayEnd.setDate(lastDayEnd.getDate() + 1);

            return (
              <TravelDetailBoxWrapper key={travelLog._id}>
                <div className="travel-date">{`${start
                  .toLocaleDateString()
                  .slice(0, 11)} ~ ${end
                  .toLocaleDateString()
                  .slice(0, 11)}`}</div>
                <Div
                  isEnd={
                    index === travelLogs.length - 1
                      ? new Date() > lastDayEnd
                      : new Date() > end
                  }
                >
                  <NavLinkWrapper
                    to={`/travel-detail-create/${travel._id}/${travelLog._id}`}
                  >
                    {index + 1}일차
                  </NavLinkWrapper>
                </Div>
              </TravelDetailBoxWrapper>
            );
          })}
        </TravelLogWrapper>
      </TravelLogContainerWrapper>
      <Navigation />
    </TravelDetailWrapper>
  );
}

const TravelDetailWrapper = styled.div`
  width: 100%;
  height: 95vh;
  background-color: #d4e3fc;
  font-family: "SuncheonB";

  .empty-space {
    height: 7%;
  }

  .travel-detail-title {
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

const TravelLogContainerWrapper = styled.div`
  height: 70%;
  margin-top: 1rem;
  overflow: scroll;
  background-color: #d4e3fc;
`;

const TravelLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

const TravelDetailBoxWrapper = styled.div`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .travel-date {
    margin-bottom: -5rem;
    margin-left: 1rem;
    font-size: 2.2rem;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 3rem;
  padding: 2rem 10rem;
  border-radius: 4rem;
  font-size: 3rem;
  background-color: #ffffff;
  box-shadow: 10px 10px 5px 5px #62b0cb;
  opacity: ${(props) => (props.isEnd ? "30%" : "100%")};
`;

const NavLinkWrapper = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
