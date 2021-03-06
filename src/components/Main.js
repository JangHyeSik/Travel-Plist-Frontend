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
                  ? "/images/clear.png"
                  : currentWeather === "Clouds" ||
                    currentWeather === "Haze" ||
                    currentWeather === "Mist" ||
                    currentWeather === "Fog"
                  ? "/images/cloudy.png"
                  : currentWeather === "Rain"
                  ? "/images/clear.png"
                  : currentWeather === "Snow"
                  ? "/images/snowing.jpg"
                  : ""
              }
              alt="날씨 배경화면"
            />
            <div className="balloon">
              {currentWeather === "Clear"
                ? "여행하기 정말 좋은 날입니다! 즐거운 여행 되세요☀️🌞"
                : currentWeather === "Clouds" ||
                  currentWeather === "Haze" ||
                  currentWeather === "Mist" ||
                  currentWeather === "Fog"
                ? "하늘에 구름이 좀 끼어서 흐린 날씨이네요 ⛅😅"
                : currentWeather === "Rain"
                ? "비가 내리는 중입니다. 우산 꼭 챙기세요 !🌧️☂️☔"
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
    width: 10rem;
    height: 11rem;
    margin-left: 7rem;
    overflow: hidden;
  }

  .character {
    width: 40rem;
    animation: moveMainSpriteSheet 1s steps(4) infinite;
  }

  @keyframes moveMainSpriteSheet {
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
    bottom: 40%;
    margin-left: 3rem;
    width: 30rem;
    padding: 2rem;
    border-radius: 1rem;
    color: #ffffff;
    background-color: #9cbdf0;
    font-size: 2.2rem;
    font-family: "SuncheonB";
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
  background-color: #cceaf7;
`;

const LoadingTextWrapper = styled.div`
  margin-top: 10rem;
  font-size: 2.5rem;
  font-weight: bold;
`;
