import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Loading() {
  const [text, setText] = useState("여행 가는 중");

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      text === "여행 가는 중..."
        ? setText("여행 가는 중")
        : setText(text + ".");
    }, 500);

    return () => {
      clearInterval(loadingInterval);
    };
  }, [text]);

  return (
    <LoadingWrapper>
      <div className="character-container">
        <img
          className="character"
          src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
          alt="캐릭터"
        />
      </div>
      <div className="loading-text">{text}</div>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  width: 100%;
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #cceaf7;

  .character-container {
    width: 30rem;
    height: 30rem;
    overflow: hidden;
  }

  .character {
    width: 120rem;
    animation: moveLoadingSpriteSheet 1s steps(4) infinite;
  }

  @keyframes moveLoadingSpriteSheet {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  .loading-text {
    margin-top: 10rem;
    margin-bottom: 10rem;
    font-size: 5rem;
    color: #ffffff;
  }
`;
