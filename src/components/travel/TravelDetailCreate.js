import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import Map from "./Map";
import { createTravelDetailRequest } from "../../features/user/userSlice";

export default function TraveDetailCreate() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { travellogid } = useParams();

  const travelId = pathname.split("/")[2];
  const { travels } = useSelector((state) => state.user.user);
  const { travelLogs } = travels.find((travel) => travel._id === travelId);
  const travelLog = travelLogs.find(
    (travelLog) => travelLog._id === travellogid
  );

  const [selectedAddress, setSelectedAddress] = useState("");
  const [markers, setMarkers] = useState([]);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [travelPlaces, setTravelPlaces] = useState([]);
  const [travelDetails, setTravelDetails] = useState([]);

  const token = sessionStorage.getItem("token");

  const handleAddTravel = () => {
    for (let i = 0; i < travelPlaces.length; i++) {
      if (travelPlaces[i] === selectedAddress) {
        alert("이미 등록하신 여행지입니다.");
        return;
      }
    }

    setTravelPlaces([...travelPlaces, selectedAddress]);
    setTravelDetails([...travelDetails, textAreaContent]);
    setTextAreaContent("");
  };

  const handleSaveTravels = () => {
    dispatch(
      createTravelDetailRequest({
        travelId,
        travellogid,
        travelPlaces,
        travelDetails,
        coordinates: markers,
        token,
      })
    );
  };

  const handleChangeTextArea = (e) => {
    setTextAreaContent(e.target.value);
  };

  const mapRef = useRef();

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const panTo = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  };

  return (
    <TraveDetailCreateWrapper>
      <SearchBox
        setSelectedAddress={setSelectedAddress}
        markers={markers}
        setMarkers={setMarkers}
        panTo={panTo}
      />
      <Map markers={markers} onMapLoad={onMapLoad} />

      <TravelDetailFormWrapper>
        {travelLog.travelPlaces.length > 0 ? (
          travelLog.travelPlaces.map((travelPlace, index) => (
            <TravelDetailBox key={index}>
              <div>{travelPlace}</div>
              <button>✖️</button>
            </TravelDetailBox>
          ))
        ) : (
          <>
            <div className="address-content-container">
              <div className="address-content">이번 여행지는 ✈️</div>
              {selectedAddress && (
                <div className="address-content">{selectedAddress}❗️</div>
              )}
            </div>
            <textarea
              className="travel-detail-textarea"
              type="text"
              placeholder="여행 내용을 입력해주세요."
              value={textAreaContent}
              onChange={handleChangeTextArea}
            />
          </>
        )}
        <div className="button-container">
          <Button onClick={handleAddTravel}>추가</Button>
          <Button onClick={handleSaveTravels}>저장</Button>
        </div>
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
