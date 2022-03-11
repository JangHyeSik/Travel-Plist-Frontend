import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import Navigation from "./Navigation";
import { fetchWeatherRequest } from "../features/weather/weatherSlice";

export default function Main() {
  const dispatch = useDispatch();

  const { weather } = useSelector((state) => state.weather);
  const [currentWeather, setCurrentWeather] = useState(weather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      dispatch(fetchWeatherRequest({ latitude, longitude }));
    });
  }, []);

  if (currentWeather !== weather) {
    setCurrentWeather(weather);
  }

  return (
    <>
      <MainWrapper>
        {currentWeather !== "" && (
          <>
            <img
              className="weather-background"
              src={
                currentWeather === "Clear"
                  ? "/images/clear2.png"
                  : currentWeather === "Clouds" ||
                    currentWeather === "Haze" ||
                    currentWeather === "Mist"
                  ? "/images/snowing.jpg"
                  : currentWeather === "Rain"
                  ? "/images/rainy.jpg"
                  : currentWeather === "Snow"
                  ? "/images/snowing.jpg"
                  : ""
              }
              alt="날씨 배경화면"
            />
            <div className="balloon">
              {currentWeather === "Clear"
                ? "여행하기 딱 좋은 날입니다! 즐거운 여행 되세요☀️🌞"
                : currentWeather === "Clouds" ||
                  currentWeather === "Haze" ||
                  currentWeather === "Mist"
                ? "구름이 조금 껴있어서 흐릴 수도 있겠네요☁️⛅"
                : currentWeather === "Rain"
                ? "비가 내리는 중입니다. 우산 챙기세요🌧️☂️☔"
                : currentWeather === "Snow"
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
      {currentWeather === "" && (
        <LoadingWrapper>
          <TailSpin color="#00BFFF" height={100} width={100} />
          <LoadingTextWrapper>
            날씨 정보를 불러오는 중입니다.
          </LoadingTextWrapper>
        </LoadingWrapper>
      )}
    </>
  );
}

const MainWrapper = styled.div`
  .weather-background {
    width: 100%;
    height: 80vh;
  }

  .character-container {
    position: absolute;
    bottom: 30%;
    left: 15%;
    width: 12rem;
    height: 14rem;
    overflow: hidden;
  }

  .character {
    width: 50rem;
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
    bottom: 43%;
    left: 9%;
    width: 50%;
    height: 10%;
    padding: 40px;
    border-radius: 1rem;
    color: #ffffff;
    background-color: #9cbdf0;
    font-size: 2.3rem;
    font-weight: bold;
  }

  .balloon:after {
    position: absolute;
    top: 100%;
    left: 20%;
    border-top: 2rem solid #9cbdf0;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #91e4fb;
`;

const LoadingTextWrapper = styled.div`
  margin-top: 10rem;
  font-size: 2.5rem;
  font-weight: bold;
`;
