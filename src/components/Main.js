import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Navigation";
import { auth } from "../firebase";
import { getWeatherRequest } from "../features/user/userSlice";

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
      {weather !== "" && (
        <>
          <img
            className="weather-background"
            src={
              weather === "Clear"
                ? "/images/clear2.png"
                : weather === "Clouds" || weather === "Haze"
                ? "/images/cloudy.png"
                : weather === "Rain"
                ? "/images/rainy.jpg"
                : weather === "Snow"
                ? "/images/snowing.jpg"
                : ""
            }
            alt="날씨 배경화면"
          />
          <div className="balloon">
            {weather === "Clear"
              ? "여행하기 딱 좋은 날입니다! 즐거운 여행 되세요☀️🌞"
              : weather === "Clouds" || weather === "Haze"
              ? "구름이 조금 껴있어서 흐릴 수도 있겠네요☁️⛅"
              : weather === "Rain"
              ? "비가 내리는 중입니다. 우산 챙기세요🌧️☂️☔"
              : weather === "Snow"
              ? "눈이 내리는 중입니다. 미끄러운 길 조심하세요!❄️☃️"
              : ""}
          </div>
          <div className="character-container">
            <img
              className="character"
              src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
              alt="캐릭터"
            />
          </div>
          <Navigation />
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
      transform: translate3d(0, 1rem, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
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
