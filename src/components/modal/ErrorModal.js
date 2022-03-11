import React from "react";
import styled from "styled-components";

export default function ErrorModal({ children, setIsOpenModal }) {
  const handelCloseModal = () => {
    setIsOpenModal({
      isEmptyInput: false,
      isDuplicatedDate: false,
      isExceedCharacters: false,
      isSearchNone: false,
      isTravelNone: false,
      isDuplicatedTravel: false,
    });
  };
  return (
    <>
      <Dimmed onClick={handelCloseModal} />
      <ErrorModalWrapper>
        <Ballon>{children}</Ballon>
        <CharacterContainer>
          <Character
            src="https://i.pinimg.com/originals/3f/20/f7/3f20f71d82b3bae528c11aacde3abe5d.png"
            alt="캐릭터"
          />
        </CharacterContainer>
        <CompleteButton onClick={handelCloseModal}>확인</CompleteButton>
      </ErrorModalWrapper>
    </>
  );
}

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0%;
  top: 0%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ErrorModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  position: fixed;
  z-index: 11;
  margin-left: -300px;
  margin-top: -300px;
  text-align: center;
  border-radius: 0.5rem;
  background-color: #d4e3fc;
  overflow: auto;
`;

const CharacterContainer = styled.div`
  position: absolute;
  bottom: 0%;
  right: 10%;
  width: 10rem;
  height: 13rem;
  overflow: hidden;
`;

const Character = styled.img`
  width: 45rem;
`;

const Ballon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 6%;
  left: 5%;
  width: 75%;
  height: 38%;
  padding: 3rem;
  border-radius: 1rem;
  background: #ffffff;
  font-size: 2.3rem;
  font-weight: bold;

  :after {
    position: absolute;
    top: 100%;
    right: 15%;
    border-top: 2.5rem solid #ffffff;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
  }
`;

const CompleteButton = styled.button`
  margin-bottom: 4rem;
  padding: 1.5rem 3rem;
  border-radius: 1rem;
  border: none;
  background-color: #9cbdf0;
  color: #ffffff;
  font-size: 2rem;
  z-index: 11;
`;
