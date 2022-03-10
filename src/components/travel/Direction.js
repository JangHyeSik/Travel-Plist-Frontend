import React, { useState, useRef, useEffect } from "react";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

export default function Direction({
  startPoint,
  endPoint,
  directionMarkersLocation,
  setDirectionData,
}) {
  const [location, setLocation] = useState();
  const count = useRef(0);
  const options = {
    polylineOptions: {
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
    },
  };

  useEffect(() => {
    count.current = 0;
  }, [startPoint.lat, startPoint.lng, endPoint.lat, endPoint.lng]);

  const directionsCallback = (result, status) => {
    if (status === "OK" && count.current === 0) {
      count.current += 1;

      const directionData = {
        ...result.routes[0].legs[0],
        directionMode: "driving-traffic",
        address: [
          directionMarkersLocation[0].address,
          directionMarkersLocation[1].address,
        ],
      };

      setDirectionData(directionData);
      setLocation(result);
    }
  };

  return (
    <>
      <DirectionsService
        options={{
          origin: startPoint,
          destination: endPoint,
          travelMode: "TRANSIT",
        }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={location} options={options} />
    </>
  );
}
