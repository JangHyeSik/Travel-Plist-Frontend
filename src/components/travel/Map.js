import React, { useState, useEffect, memo } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import PropTypes from "prop-types";

function Map({ marker, onMapLoad, recordedMarkers }) {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

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

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "50vh" }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        onLoad={onMapLoad}
      >
        {recordedMarkers.length > 0
          ? recordedMarkers.map((recordedMarker, index) => (
              <Marker
                key={index}
                position={{ lat: recordedMarker.lat, lng: recordedMarker.lng }}
                icon={"/images/character.png"}
              />
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
          <Marker
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        )}
        <Polyline path={recordedMarkers} />
      </GoogleMap>
    </>
  );
}

Map.propTypes = {
  marker: PropTypes.object,
  onMapLoad: PropTypes.func.isRequired,
  recordedMarkers: PropTypes.array,
};

export default memo(Map);
