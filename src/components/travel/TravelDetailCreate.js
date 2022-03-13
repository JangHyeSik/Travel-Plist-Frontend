import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import SearchBox from "./SearchBox";
import Map from "./Map";
import TravelDetailModal from "../modal/TravelDetailModal";
import ErrorModal from "../modal/ErrorModal";
import GoBackButton from "../button/GobackButton";
import { createTravelDetailRequest } from "../../features/user/userSlice";
import { makeTime } from "../../util/makeTime";

export default function TravelDetailCreate() {
  const dispatch = useDispatch();
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
    address: "",
  });
  const [isOpenModal, setIsOpenModal] = useState({
    isTravelDetail: false,
    isSearchNone: false,
    isTravelNone: false,
    isDuplicatedTravel: false,
  });
  const [isClickedButton, setIsClickedButton] = useState({
    isTravelAddButton: false,
    isEditButton: false,
  });
  const [directionMode, setDirectionMode] = useState({
    isDirectionMode: false,
    isSelectMode: false,
    isDriving: false,
    isDrivingTraffic: false,
    isCycling: false,
    isWalking: false,
  });

  const [directionData, setDirectionData] = useState({});
  const [directionLocation, setDirectionLocation] = useState([]);
  const [directionMarkersLocation, setDirectionMarkersLocation] = useState([]);
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState([]);

  const { isDirectionMode, isSelectMode, isDrivingTraffic } = directionMode;
  const { isTravelDetail, isSearchNone, isTravelNone, isDuplicatedTravel } =
    isOpenModal;
  const { isTravelAddButton, isEditButton } = isClickedButton;

  const token = sessionStorage.getItem("token");

  const handleAddTravel = () => {
    if (selectedAddress === "") {
      setIsOpenModal({
        ...isOpenModal,
        isSearchNone: true,
      });

      return;
    }

    for (let i = 0; i < travelPlaces.length; i++) {
      if (travelPlaces[i] === selectedAddress) {
        setIsOpenModal({
          ...isOpenModal,
          isDuplicatedTravel: true,
        });
        setAddress("");
        setSelectedAddress("");
        setTextAreaContent("");

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
      setIsOpenModal({
        ...isOpenModal,
        isTravelNone: true,
      });

      return;
    }

    setAddress("");
    setSelectedAddress("");
    setTextAreaContent("");
    setIsClickedButton({
      ...isClickedButton,
      isTravelAddButton: false,
      isEditButton: false,
    });
    setIsOpenModal({
      ...isOpenModal,
      isTravelDetail: false,
    });

    setMarker({
      ...marker,
      lat: 0,
      lng: 0,
      address: "",
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

  const handleOnOffDirectionMode = () => {
    if (isDirectionMode) {
      setDirectionMode({
        ...directionMode,
        isDirectionMode: false,
        isSelectMode: false,
        isDriving: false,
        isDrivingTraffic: false,
        isCycling: false,
        isWalking: false,
      });
      setDirectionData({});
      setDirectionMarkersLocation([]);
      setDirectionLocation([]);
      setClickedMarkerIndex([]);
    } else {
      setDirectionMode({
        ...directionMode,
        isDirectionMode: true,
      });
    }
  };

  const handleSelectDirectionMode = (e) => {
    const { name } = e.target;

    setDirectionMode({
      ...directionMode,
      isSelectMode: true,
      [name]: true,
    });
  };

  const handleInitializationDirectionMode = () => {
    setDirectionMode({
      ...directionMode,
      isSelectMode: false,
      isDriving: false,
      isDrivingTraffic: false,
      isCycling: false,
      isWalking: false,
    });
    setDirectionData({});
    setDirectionMarkersLocation([]);
    setDirectionLocation([]);
    setClickedMarkerIndex([]);
  };

  return (
    <>
      <TraveDetailCreateWrapper>
        <GoBackButton />
        <SearchBox
          address={address}
          setAddress={setAddress}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          marker={marker}
          setMarker={setMarker}
          panTo={panTo}
        />
        <DirectionButton
          onClick={handleOnOffDirectionMode}
          isDirectionMode={isDirectionMode}
        >
          경로탐색 {isDirectionMode ? "OFF" : "ON"}
        </DirectionButton>
        <Map
          marker={marker}
          onMapLoad={onMapLoad}
          recordedMarkers={recordedMarkers}
          directionMode={directionMode}
          directionLocation={directionLocation}
          setDirectionLocation={setDirectionLocation}
          directionMarkersLocation={directionMarkersLocation}
          setDirectionMarkersLocation={setDirectionMarkersLocation}
          setDirectionData={setDirectionData}
          clickedMarkerIndex={clickedMarkerIndex}
          setClickedMarkerIndex={setClickedMarkerIndex}
        />

        {!isDirectionMode && (
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

                        setIsOpenModal({
                          ...isOpenModal,
                          isTravelDetail: true,
                        });
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
            {isTravelDetail && (
              <TravelDetailModal
                selectedTravelLog={selectedTravelLog}
                setSelectedTravelLog={setSelectedTravelLog}
                onSave={handleSaveTravels}
                travelDetails={travelDetails}
                setTravelDetails={setTravelDetails}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
              />
            )}
          </TravelDetailFormWrapper>
        )}

        {isDirectionMode && !isSelectMode && (
          <TravelModeWrapper>
            <h1>원하시는 경로탐색 모드를 선택해주세요 !</h1>
            <TravelModeButtonContainer>
              <TravelModeButton
                onClick={handleSelectDirectionMode}
                name="isWalking"
              >
                🚶‍♂️도보
              </TravelModeButton>
              <TravelModeButton
                onClick={handleSelectDirectionMode}
                name="isCycling"
              >
                🚴‍♀️ 자전거
              </TravelModeButton>
            </TravelModeButtonContainer>
            <TravelModeButtonContainer>
              <TravelModeButton
                onClick={handleSelectDirectionMode}
                name="isDrivingTraffic"
              >
                🚍 대중교통
              </TravelModeButton>
              <TravelModeButton
                onClick={handleSelectDirectionMode}
                name="isDriving"
              >
                🚗 차
              </TravelModeButton>
            </TravelModeButtonContainer>
          </TravelModeWrapper>
        )}
        {isSelectMode && (
          <DirectionWrapper>
            <div>
              출발지: {directionData.address ? directionData.address[0] : ""}
            </div>
            <div>
              도착지: {directionData.address ? directionData.address[1] : ""}
            </div>
            <div>
              이동수단:{" "}
              {directionData.directionMode === "driving"
                ? "차"
                : directionData.directionMode === "driving-traffic"
                ? "대중교통"
                : directionData.directionMode === "cycling"
                ? "자전거"
                : directionData.directionMode === "walking"
                ? "도보"
                : ""}
            </div>
            <div>
              거리: 약{" "}
              {directionData.distance
                ? isDrivingTraffic
                  ? directionData.distance.text
                  : `${(directionData.distance / 1000).toFixed(3)} km`
                : ""}
            </div>
            <div>
              예상소요시간: 약
              {directionData.duration
                ? isDrivingTraffic
                  ? directionData.duration.text
                  : ` ${makeTime(directionData.duration)} 소요예상`
                : ""}
            </div>
            <Button onClick={handleInitializationDirectionMode}>초기화</Button>
          </DirectionWrapper>
        )}
      </TraveDetailCreateWrapper>
      {(isSearchNone || isTravelNone || isDuplicatedTravel) && (
        <ErrorModal setIsOpenModal={setIsOpenModal}>
          <>
            {isSearchNone && "장소를 입력해주세요 :)"}
            {isTravelNone && "여행지를 추가해주세요 :)"}
            {isDuplicatedTravel && "이미 등록된 여행지입니다 :)"}
          </>
        </ErrorModal>
      )}
    </>
  );
}

const TraveDetailCreateWrapper = styled.div`
  width: 100%;
  height: 88vh;
  background-color: #d4e3fc;
`;

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

const TravelDetailFormWrapper = styled.div`
  width: 100%;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

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

const DirectionButton = styled.button`
  position: absolute;
  z-index: 11;
  top: 2.5%;
  right: 3%;
  width: 15%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: ${(props) =>
    props.isDirectionMode ? "#e84118" : "#9cbdf0"};
  color: #ffffff;
`;

const DeleteButton = styled.button`
  padding: 1rem;
`;

const TravelModeButtonContainer = styled.div`
  width: 100%;
  height: 20vh;

  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #d4e3fc;
  border: none;
`;

const TravelModeButton = styled.button`
  width: 290px;
  height: 190px;
  padding: 50px;
  border: none;
  border-radius: 1rem;
  font-size: 2rem;
  font-weight: bold;
  background-color: #9cbdf0;
  color: #ffffff;
`;

const TravelModeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  font-weight: bold;
`;

const DirectionWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  font-size: 2.5rem;
`;
