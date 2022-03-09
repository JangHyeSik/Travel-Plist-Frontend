import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import Map from "./Map";
import Modal from "../Modal";
import { createTravelDetailRequest } from "../../features/user/userSlice";

export default function TravelDetailCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { travellogid } = useParams();

  const travelId = pathname.split("/")[2];
  const { travels } = useSelector((state) => state.user.user);
  const { travelLogs } = travels.find((travel) => travel._id === travelId);
  const travelLog = travelLogs.find(
    (travelLog) => travelLog._id === travellogid
  );

  const [travelPlaces, setTravelPlaces] = useState(travelLog.travelPlaces);
  const [travelDetails, setTravelDetails] = useState(travelLog.travelDetails);
  const [recordedMarkers, setRecordedMarkers] = useState(travelLog.coordinates);
  const [selectedTravelLog, setSelectedTravelLog] = useState({
    index: null,
    place: "",
    detail: "",
  });
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [textAreaContent, setTextAreaContent] = useState("");
  const [marker, setMarker] = useState({
    lat: 0,
    lng: 0,
  });
  const [isOpenTravelModal, setIsOpenTravelModal] = useState(false);
  const [isClickedButton, setIsClickedButton] = useState({
    isTravelAddButton: false,
    isEditButton: false,
  });

  const { isTravelAddButton, isEditButton } = isClickedButton;

  const token = sessionStorage.getItem("token");

  const handleAddTravel = () => {
    if (selectedAddress === "") {
      alert("장소를 입력해주세요.");
      return;
    }

    for (let i = 0; i < travelPlaces.length; i++) {
      if (travelPlaces[i] === selectedAddress) {
        alert("이미 등록하신 여행지입니다.");
        return;
      }
    }

    setTravelPlaces([...travelPlaces, selectedAddress]);
    setTravelDetails([...travelDetails, textAreaContent]);
    setRecordedMarkers([...recordedMarkers, marker]);
    setAddress("");
    setSelectedAddress("");
    setTextAreaContent("");
  };

  const handleSaveTravels = () => {
    if (!travelLog.travelPlaces.length && !travelPlaces.length) {
      alert("여행지를 추가해주세요 !");
      return;
    }

    setAddress("");
    setSelectedAddress("");
    setIsClickedButton({
      ...isClickedButton,
      isTravelAddButton: false,
      isEditButton: false,
    });
    setIsOpenTravelModal(false);

    setMarker({
      lat: 0,
      lng: 0,
    });

    dispatch(
      createTravelDetailRequest({
        travelId,
        travellogid,
        travelPlaces,
        travelDetails,
        coordinates: recordedMarkers,
        token,
      })
    );
  };

  const handleChangeTextArea = (e) => {
    setTextAreaContent(e.target.value);
  };

  const handleDeleteTravelDetail = (e) => {
    const { value } = e.target;

    const deletedIndex = travelPlaces.findIndex(
      (travelPlace) => travelPlace === value
    );

    const deletedTravelPlace = travelPlaces.filter(
      (travelPlace, index) => index !== deletedIndex
    );

    const deletedTravelDetails = travelDetails.filter(
      (travelDetail, index) => index !== deletedIndex
    );

    const deletedRecordedMarker = recordedMarkers.filter(
      (recordedMarker, index) => index !== deletedIndex
    );

    setTravelPlaces(deletedTravelPlace);
    setTravelDetails(deletedTravelDetails);
    setRecordedMarkers(deletedRecordedMarker);
  };

  const mapRef = useRef();

  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
    },
    [marker, recordedMarkers]
  );

  const panTo = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  };

  return (
    <TraveDetailCreateWrapper>
      <GoBackButton onClick={() => navigate(-1)}>⬅️</GoBackButton>
      <SearchBox
        address={address}
        setAddress={setAddress}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        marker={marker}
        setMarker={setMarker}
        panTo={panTo}
      />
      <Map
        marker={marker}
        onMapLoad={onMapLoad}
        recordedMarkers={recordedMarkers}
      />

      <TravelDetailFormWrapper>
        {!isTravelAddButton &&
          travelLog.travelPlaces.length > 0 &&
          travelPlaces.map((travelPlace, index) => {
            return (
              <TravelDetailBox key={index}>
                <div
                  onClick={() => {
                    setSelectedTravelLog({
                      ...selectedTravelLog,
                      index,
                      place: travelPlace,
                      detail: travelLog.travelDetails[index],
                    });

                    setIsOpenTravelModal(true);
                  }}
                >
                  {travelPlace}
                </div>

                {isEditButton && (
                  <DeleteButton
                    onClick={handleDeleteTravelDetail}
                    value={travelPlace}
                  >
                    ❌
                  </DeleteButton>
                )}
              </TravelDetailBox>
            );
          })}

        {(!travelLog.travelPlaces.length || isTravelAddButton) && (
          <>
            <div className="address-content-container">
              <div className="address-content">이번 여행지는 ✈️</div>
              {selectedAddress && (
                <div className="address-content">{selectedAddress}❗️</div>
              )}
            </div>
            <textarea
              type="text"
              className="travel-detail-textarea"
              placeholder="여행 내용을 입력해주세요."
              value={textAreaContent}
              onChange={handleChangeTextArea}
            />
            <div className="button-container">
              <Button onClick={handleAddTravel}>추가</Button>
              <Button onClick={handleSaveTravels}>저장</Button>
            </div>
          </>
        )}
        <div className="button-container">
          {travelLog.travelPlaces.length > 0 && !isTravelAddButton && (
            <>
              <Button
                onClick={() =>
                  setIsClickedButton({
                    ...isClickedButton,
                    isTravelAddButton: true,
                  })
                }
              >
                여행지 추가하기
              </Button>
              {!isEditButton ? (
                <Button
                  onClick={() =>
                    setIsClickedButton({
                      ...isClickedButton,
                      isEditButton: true,
                    })
                  }
                >
                  편집
                </Button>
              ) : (
                <Button onClick={handleSaveTravels}>저장</Button>
              )}
            </>
          )}
        </div>
        {isOpenTravelModal && (
          <Modal
            selectedTravelLog={selectedTravelLog}
            setSelectedTravelLog={setSelectedTravelLog}
            onSave={handleSaveTravels}
            travelDetails={travelDetails}
            setTravelDetails={setTravelDetails}
            setIsOpenTravelModal={setIsOpenTravelModal}
          />
        )}
      </TravelDetailFormWrapper>
    </TraveDetailCreateWrapper>
  );
}

const TravelDetailBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 38rem;
  height: 3rem;
  padding: 2rem;
  border-radius: 4rem;
  font-size: 1.8rem;
  background-color: #ffffff;
  text-align: center;
`;

const TraveDetailCreateWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const TravelDetailFormWrapper = styled.div`
  width: 100%;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #d4e3fc;

  .address-content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }

  .address-content {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bold;
  }

  .travel-detail-textarea {
    padding: 10rem;
    border: none;
    border-radius: 1rem;
    font-size: 2rem;
    text-align: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled.button`
  margin-right: 1rem;
  padding: 1.5rem 3rem;
  border-radius: 1rem;
  border: none;
  background-color: #9cbdf0;
  color: #ffffff;
  font-size: 2rem;
`;

const DeleteButton = styled.button`
  padding: 1rem;
`;

const GoBackButton = styled.button`
  position: absolute;
  top: 2%;
  left: 2%;
  z-index: 10;
  border: none;
  background-color: transparent;
  font-size: 3rem;
`;
