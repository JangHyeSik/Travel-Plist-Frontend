import React, { useState, useRef } from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import Map from "./Map";

export default function TraveDetailCreate() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [markers, setMarkers] = useState([]);
  const [isClickedAddButton, setIsClickedAddButton] = useState(false);

  const [textAreaContent, setTextAreaContent] = useState("");
  const [travelPlaces, setTravelPlaces] = useState([]);
  const [travelDetails, setTravelDetails] = useState([]);

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
          onChange={handleChangeTextArea}
        />
        <div className="button-container">
          <Button onClick={handleAddTravel}>추가</Button>
          <Button>저장</Button>
        </div>
      </TravelDetailFormWrapper>
    </TraveDetailCreateWrapper>
  );
}

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
