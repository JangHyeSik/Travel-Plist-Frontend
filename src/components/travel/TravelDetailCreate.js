import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Map from "./Map";

export default function TraveDetailCreate() {
  const [markers, setMarkers] = useState([]);

  return (
    <>
      <Map markers={markers} />
      <SearchBox setMarkers={setMarkers} />
    </>
  );
}
