import React from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

export default function TravelDetailModal({
  travelDetails,
  selectedTravelLog,
  setTravelDetails,
  isOpenModal,
  setIsOpenModal,
  onSave,
}) {
  const { place, detail } = selectedTravelLog;

  const debouncedSave = debounce((content) => {
    handleUpdate(content);
  }, 750);

  const handleUpdate = (modifiedContent) => {
    const modifiedTravelDetails = travelDetails.map((travelDetail, index) =>
      index === selectedTravelLog.index ? modifiedContent : travelDetail
    );

    setTravelDetails(modifiedTravelDetails);
  };

  const handleChangeTextArea = (e) => {
    debouncedSave(e.target.value);
  };

  return (
    <>
      <Dimmed
        onClick={() =>
          setIsOpenModal({ ...isOpenModal, isTravelDetail: false })
        }
      />
      <TravelModal>
        <div className="trave-place-title">장소: {place}</div>
        <textarea
          className="travel-detail-textarea"
          defaultValue={detail}
          onChange={handleChangeTextArea}
        ></textarea>
        <CompleteButton onClick={onSave}>완료</CompleteButton>
      </TravelModal>
    </>
  );
}

TravelDetailModal.propTypes = {
  travelDetails: PropTypes.array,
  selectedTravelLog: PropTypes.object,
  setTravelDetails: PropTypes.func.isRequired,
  setIsOpenModal: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const TravelModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  top: 50%;
  left: 50%;
  width: 700px;
  height: 700px;
  position: fixed;
  z-index: 12;
  margin-left: -350px;
  margin-top: -350px;
  text-align: center;
  border-radius: 0.5rem;
  background-color: #d4e3fc;
  overflow: auto;

  .trave-place-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: bold;
  }

  .travel-detail-textarea {
    padding: 10rem 7rem;
  }
`;

const CompleteButton = styled.button`
  margin-right: 1rem;
  padding: 1.5rem 3rem;
  border-radius: 1rem;
  border: none;
  background-color: #9cbdf0;
  color: #ffffff;
  font-size: 2rem;
`;

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0%;
  top: 0%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.5);
`;
