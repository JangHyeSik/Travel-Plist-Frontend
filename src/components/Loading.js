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
          className="character-sprite-sheet"
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #91e4fb;

  .character-container {
    width: 35rem;
    height: 40rem;
    overflow: hidden;
  }

  .character-sprite-sheet {
    width: 150rem;
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

  .loading-text {
    font-size: 5rem;
    color: #ffffff;
  }
`;
