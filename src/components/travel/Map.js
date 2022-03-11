import React, { useState, useEffect, memo } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import PropTypes from "prop-types";
import Direction from "./Direction";

function Map({
  marker,
  onMapLoad,
  recordedMarkers,
  directionMode,
  directionLocation,
  setDirectionLocation,
  directionMarkersLocation,
  setDirectionMarkersLocation,
  setDirectionData,
  clickedMarkerIndex,
  setClickedMarkerIndex,
}) {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const { isSelectMode, isDriving, isDrivingTraffic, isCycling, isWalking } =
    directionMode;

  const travelMode = isDriving
    ? "driving"
    : isCycling
    ? "cycling"
    : isWalking
    ? "walking"
    : "";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setCurrentLocation({
        ...currentLocation,
        lat,
        lng,
      });
    });
  }, []);

  const defaultProps = {
    center: {
      lat:
        recordedMarkers.length > 0
          ? recordedMarkers[recordedMarkers.length - 1].lat
          : currentLocation.lat,
      lng:
        recordedMarkers.length > 0
          ? recordedMarkers[recordedMarkers.length - 1].lng
          : currentLocation.lng,
    },
    zoom: 17,
  };

  const startPoint = directionMarkersLocation[0];
  const endPoint = directionMarkersLocation[1];

  const getDirection = async () => {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/${travelMode}/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`
    );

    const coords = response.data.routes[0].geometry.coordinates.map(
      (coordinate) => {
        return { lat: coordinate[1], lng: coordinate[0] };
      }
    );

    const directionData = {
      ...response.data.routes[0],
      directionMode: travelMode,
      address: [
        directionMarkersLocation[0].address,
        directionMarkersLocation[1].address,
      ],
    };

    setDirectionLocation(coords);
    setDirectionData(directionData);
  };

  useEffect(() => {
    if (!isDrivingTraffic && directionMarkersLocation.length === 2) {
      getDirection();
    }
  }, [directionMarkersLocation]);

  const options = {
    mapTypeControl: false,
    fullscreenControl: false,
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "50vh",
        }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        onLoad={onMapLoad}
        options={options}
      >
        {recordedMarkers.length > 0
          ? recordedMarkers.map((recordedMarker, index) => (
              <Marker
                key={index}
                position={{
                  lat: recordedMarker.lat,
                  lng: recordedMarker.lng,
                }}
                icon={"/images/character.png"}
                onClick={() => {
                  if (isSelectMode) {
                    if (directionMarkersLocation.length < 2) {
                      setDirectionMarkersLocation((prev) => [
                        ...prev,
                        {
                          lat: recordedMarker.lat,
                          lng: recordedMarker.lng,
                          address: recordedMarker.address,
                        },
                      ]);

                      setClickedMarkerIndex([...clickedMarkerIndex, index]);
                    }
                  }
                }}
              >
                {isSelectMode && (
                  <InfoWindow
                    options={{
                      maxWidth: 150,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "130px",
                        height: "70px",
                        fontSize: "2rem",
                        textAlign: "center",
                      }}
                    >
                      {index === clickedMarkerIndex[0]
                        ? "출발지"
                        : index === clickedMarkerIndex[1]
                        ? "도착지"
                        : "클릭 !"}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))
          : currentLocation.lat !== 0 &&
            currentLocation.lng !== 0 && (
              <Marker
                position={{
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }}
              />
            )}

        {marker.lat !== 0 && marker.lng !== 0 && (
          <>
            <Marker
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          </>
        )}

        {directionMarkersLocation.length === 2 &&
          (isDriving || isCycling || isWalking ? (
            <Polyline
              path={directionLocation}
              options={{
                strokeColor: "#ff2527",
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      scale: 5,
                    },
                    offset: "0",
                    repeat: "20px",
                  },
                ],
              }}
            />
          ) : (
            isDrivingTraffic && (
              <Direction
                startPoint={directionMarkersLocation[0]}
                endPoint={directionMarkersLocation[1]}
                directionMarkersLocation={directionMarkersLocation}
                setDirectionData={setDirectionData}
              />
            )
          ))}
      </GoogleMap>
    </>
  );
}

Map.propTypes = {
  marker: PropTypes.object,
  onMapLoad: PropTypes.func.isRequired,
  recordedMarkers: PropTypes.array,
  directionMode: PropTypes.object,
  directionLocation: PropTypes.array,
  setDirectionLocation: PropTypes.func.isRequired,
  directionMarkersLocation: PropTypes.array,
  setDirectionMarkersLocation: PropTypes.func.isRequired,
  setDirectionData: PropTypes.func.isRequired,
  clickedMarkerIndex: PropTypes.array,
  setClickedMarkerIndex: PropTypes.func.isRequired,
};

export default memo(Map);
