import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import PropTypes from "prop-types";

export default function SearchBox({
  setSelectedAddress,
  markers,
  setMarkers,
  panTo,
}) {
  const [address, setAddress] = useState("");

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);

      setAddress(address);
      setSelectedAddress(address);
      setMarkers([
        ...markers,
        {
          lat: latLng.lat,
          lng: latLng.lng,
        },
      ]);

      panTo({ lat: latLng.lat, lng: latLng.lng });
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: "1rem",
        left: "25%",
        color: "black",
        zIndex: "10",
        margin: "0",
        padding: "1rem",
      }}
    >
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ suggestions, getInputProps, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({ placeholder: "장소를 입력해주세요." })}
              style={{
                padding: "1rem 8rem",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            />

            <div>
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? {
                      fontSize: "1.5rem",
                      color: "#ffffff",
                      backgroundColor: "#9cbdf0",
                      padding: "1rem",
                    }
                  : {
                      fontSize: "1.3rem",
                      backgroundColor: "#ffffff",
                    };

                return (
                  <div
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ marginRight: "1rem" }}>📌</div>
                      <div>
                        <div>{suggestion.formattedSuggestion.mainText}</div>
                        <div>{suggestion.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

SearchBox.propTypes = {
  setSelectedAddress: PropTypes.func.isRequired,
  markers: PropTypes.array,
  setMarkers: PropTypes.func.isRequired,
  panTo: PropTypes.func.isRequired,
};
