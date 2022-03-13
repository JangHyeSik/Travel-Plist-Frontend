import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import Direction from "./Direction";
import { fetchDirectionDataRequest } from "../../features/direction/directionSlice";

function Map({
  marker,
  onMapLoad,
  recordedMarkers,
  directionMode,
  directionMarkersLocation,
  setDirectionMarkersLocation,
  clickedMarkerIndex,
  setClickedMarkerIndex,
}) {
  const dispatch = useDispatch();
  const directionData = useSelector((state) => state.direction.directionData);

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
    dispatch(fetchDirectionDataRequest({ travelMode, startPoint, endPoint }));
  };

  const coords = directionData.geometry
    ? directionData.geometry.coordinates.map((coordinate) => {
        return { lat: coordinate[1], lng: coordinate[0] };
      })
    : [];

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
          height: "44vh",
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
                      const isDuplicatedClick = clickedMarkerIndex.some(
                        (clickdIndex) => clickdIndex === index
                      );

                      if (isDuplicatedClick) return;

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
                    position={{
                      lat: recordedMarker.lat,
                      lng: recordedMarker.lng,
                    }}
                    options={{
                      maxWidth: 200,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "130px",
                        height: "4rem",
                        fontSize: "1.5rem",
                        textAlign: "center",
                      }}
                    >
                      {index === clickedMarkerIndex[0]
                        ? "출발지 !"
                        : index === clickedMarkerIndex[1]
                        ? "도착지 !"
                        : `${recordedMarker.address}`}
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
              path={coords}
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
  directionMarkersLocation: PropTypes.array,
  setDirectionMarkersLocation: PropTypes.func.isRequired,
  clickedMarkerIndex: PropTypes.array,
  setClickedMarkerIndex: PropTypes.func.isRequired,
};

export default memo(Map);
