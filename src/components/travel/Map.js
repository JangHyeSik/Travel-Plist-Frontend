import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import PropTypes from "prop-types";

export default function Map({ markers, onMapLoad }) {
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
    center: { lat: currentLocation.lat, lng: currentLocation.lng },
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
        {markers.length
          ? markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={"/images/character.png"}
              />
            ))
          : currentLocation.lat !== 0 &&
            currentLocation.lng !== 0 && (
              <>
                <Marker
                  position={{
                    lat: currentLocation.lat,
                    lng: currentLocation.lng,
                  }}
                />
              </>
            )}
        <Polyline path={markers} />
      </GoogleMap>
    </>
  );
}

Map.propTypes = {
  markers: PropTypes.array,
  onMapLoad: PropTypes.func.isRequired,
};
