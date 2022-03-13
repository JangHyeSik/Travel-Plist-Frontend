import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { fetchDirectionDataRequest } from "../../features/direction/directionSlice";

export default function Direction({ startPoint, endPoint }) {
  const dispatch = useDispatch();
  const directionData = useSelector((state) => state.direction.directionData);

  const count = useRef(0);

  useEffect(() => {
    count.current = 0;
  }, [startPoint.lat, startPoint.lng, endPoint.lat, endPoint.lng]);

  const directionsCallback = (result, status) => {
    if (status === "OK" && count.current === 0) {
      count.current += 1;

      const publicTransportDirectionData = {
        ...result,
        directionMode: "driving-traffic",
        address: [startPoint.address, endPoint.address],
      };

      dispatch(fetchDirectionDataRequest({ publicTransportDirectionData }));
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
      <DirectionsRenderer
        directions={directionData}
        options={{
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
        }}
      />
    </>
  );
}
