import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GobackButton from "../button/GobackButton";
import { createTravelRequest } from "../../features/user/userSlice";
import ErrorModal from "../modal/ErrorModal";

export default function TravelCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [travel, setTravel] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });
  const [isOpenModal, setIsOpenModal] = useState({
    isEmptyInput: false,
    isDuplicatedDate: false,
    isExceedCharacters: false,
  });

  const { _id, travels } = useSelector((state) => state.user.user);

  const { title, startDate, endDate } = travel;
  const { isEmptyInput, isDuplicatedDate, isExceedCharacters } = isOpenModal;

  const token = sessionStorage.getItem("token");

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setTravel({
      ...travel,
      [name]: value,
    });
  };

  const handleCreateTravel = (e) => {
    e.preventDefault();

    if (title === "" || startDate === "" || endDate === "") {
      setIsOpenModal({
        ...isOpenModal,
        isEmptyInput: true,
      });

      return;
    }

    if (title.length > 15) {
      setIsOpenModal({
        ...isOpenModal,
        isExceedCharacters: true,
      });

      return;
    }

    const isDuplicatedDate = travels.some((travel) => {
      const differenceDay =
        (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24) + 1;

      for (let i = 0; i < differenceDay; i++) {
        const compareDate = new Date(startDate);

        compareDate.setDate(compareDate.getDate() + i);

        if (
          compareDate.toISOString() ===
            new Date(travel.startDate).toISOString() ||
          compareDate.toISOString() === new Date(travel.endDate).toISOString()
        ) {
          return true;
        }
      }
    });

    if (isDuplicatedDate) {
      setIsOpenModal({
        ...isOpenModal,
        isDuplicatedDate: true,
      });

      return;
    }

    dispatch(
      createTravelRequest({
        title,
        startDate,
        endDate,
        userId: _id,
        token,
      })
    );

    navigate("/mytravels");
  };

  const date = new Date();
  const currentDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  return (
    <>
      <TravelCreateWrapper>
        <GobackButton />
        <div className="travel-create-description">
          여행 일정을 입력해주세요!
        </div>
        <FormContainerWrapper onSubmit={handleCreateTravel}>
          <InputContainerWrapper>
            <div>여행 제목</div>
            <input
              type="text"
              className="input-title-box"
              placeholder="여행 제목을 입력해주세요."
              name="title"
              onChange={handleInputChange}
            />
          </InputContainerWrapper>
          <InputContainerWrapper>
            <div>여행 시작일</div>
            <input
              type="date"
              className="input-date-box"
              name="startDate"
              min={currentDate}
              onChange={handleInputChange}
            />
          </InputContainerWrapper>
          <InputContainerWrapper>
            <div>여행 종료일</div>
            <input
              type="date"
              className="input-date-box"
              name="endDate"
              min={travel.startDate}
              onChange={handleInputChange}
            />
          </InputContainerWrapper>
          <TravelCreateButton>저 장</TravelCreateButton>
        </FormContainerWrapper>
      </TravelCreateWrapper>
      {(isEmptyInput || isDuplicatedDate || isExceedCharacters) && (
        <ErrorModal setIsOpenModal={setIsOpenModal}>
          {isEmptyInput && "빈 칸을 채워주세요:)"}
          {isDuplicatedDate && (
            <>
              <div>다른 여행과</div>
              <div>겹치는 날짜가 있습니다:)</div>
            </>
          )}
          {isExceedCharacters && "여행 제목을 15자 이내로 작성해주세요:)"}
        </ErrorModal>
      )}
    </>
  );
}

const TravelCreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #d4e3fc;

  .travel-create-description {
    display: flex;
    align-items: center;
    margin-top: 6rem;
    height: 10vh;
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }
`;

const FormContainerWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const InputContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 3rem;

  .input-title-box {
    margin-top: 3rem;
    padding: 2rem 7rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 2rem;
  }

  .input-date-box {
    margin-top: 3rem;
    padding: 2rem 12rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 2rem;
  }
`;

const TravelCreateButton = styled.button`
  padding: 2rem 10rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  background-color: #9cbdf0;
  color: #ffffff;
`;
