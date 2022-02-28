import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWeatherRequest } from "../features/user/userSlice";
import { auth } from "../firebase";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const weather = useSelector((state) => state.user.weather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      dispatch(getWeatherRequest({ latitude, longitude }));
    });
  }, []);

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <MainWrapper>
      {weather === "Clear" && (
        <>
          <img
            className="weather-background"
            src="/images/clear.jpg"
            alt="비 오는 배경"
          />
          <div className="balloon">
            여행하기 딱 좋은 날입니다! 즐거운 여행 되세요☀️🌞
          </div>
          <div className="navigation-container">
            <StyledNavLink to="/mytravels">나의 여행✈️</StyledNavLink>
            <StyledNavLink to="/mydiarys">나의 기록📖</StyledNavLink>
          </div>
        </>
      )}

      {weather === "Rain" && (
        <>
          <img
            className="weather-background"
            src="/images/rainy.jpg"
            alt="비 오는 배경"
          />
          <div className="balloon">
            비가 내리는 중입니다. 우산 챙기세요🌧️☂️☔
          </div>
          <div className="character-container">
            <img
              className="character"
              src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
              alt="캐릭터"
            />
          </div>
          <div className="navigation-container">
            <StyledNavLink to="/mytravels">나의 여행✈️</StyledNavLink>
            <StyledNavLink to="/mydiarys">나의 기록📖</StyledNavLink>
          </div>
        </>
      )}

      {weather === "Snow" && (
        <>
          <img
            className="weather-background"
            src="/images/snowing.jpg"
            alt="눈 오는 배경"
          />
          <div className="balloon">
            눈이 내리는 중입니다. 미끄러운 길 조심하세요!❄️☃️
          </div>
          <div className="navigation-container">
            <StyledNavLink to="/mytravels">나의 여행✈️</StyledNavLink>
            <StyledNavLink to="/mydiarys">나의 기록📖</StyledNavLink>
          </div>
        </>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  .weather-background {
    width: 100%;
    height: 80vh;
  }

  .navigation-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 20vh;
    background-color: #9cbdf0;
  }

  .character-container {
    position: absolute;
    bottom: 32%;
    left: 8%;
    width: 15rem;
    height: 18rem;
    overflow: hidden;
  }

  .character {
    width: 70rem;
    animation: moveSpriteSheet 1s steps(4) infinite;
  }

  @keyframes moveSpriteSheet {
    from {
      transform: translate3d(0px, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  .balloon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 40%;
    left: 10%;
    width: 35%;
    height: 4%;
    padding: 3rem;
    border-radius: 1rem;
    background: #ffffff;
    font-size: 2rem;
    font-weight: bold;
  }

  .balloon:after {
    position: absolute;
    top: 100%;
    left: 20%;
    border-top: 1.5rem solid #ffffff;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 3rem;
  color: #ffffff;
`;
