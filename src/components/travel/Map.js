import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

export default function Map({ markers }) {
  const defaultProps = {
    center: { lat: 37.508105, lng: 127.061341 },
    zoom: 14,
  };

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  // const options = {
  //   disableDefaultUI: true,
  // };
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultProps.center}
      zoom={defaultProps.zoom}
      // options={options}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  );
}

Map.propTypes = {
  markers: PropTypes.array,
  coordinates: PropTypes.object,
  setCoordinates: PropTypes.func,
};

// 마커객체 불러옴, 좌표 배열에 담기, 배열을 map으로 렌더, Marker 속성으로 주기

// const renderMarkers = (map, maps) => {
//   const marker = new maps.Marker({
//     position: { lat: coordinates.lat, lng: coordinates.lng },
//     map,
//     title: "Hello World!",
//   });

//   return marker;
// };

// <div style={{ height: "50vh", width: "100%" }}>
//   <GoogleMapReact
//     bootstrapURLKeys={{
//       key: process.env.REACT_APP_GOOGLE_API_KEY,
//       libraries: ["places"],
//     }}
//     center={defaultProps.center}
//     zoom={defaultProps.zoom}
//     yesIWantToUseGoogleMapApiInternals
//     onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
//   />
// </div>
