import React from "react";
import useMapContext from "../../Context/useMapContext";

export default function AutocompleteSuggestion({
  pointId,
  place,
  setAutocompleteSuggestions,
}) {
  const { markers, placeMarker, moveMarker } = useMapContext();

  const handleSelectSuggestion = () => {
    const currentPoint = markers.find((m) => m.id === pointId);

    if (currentPoint.place === null) {
      const pointCoordinates = {
        lngLat: { lng: place.center[0], lat: place.center[1] },
      };
      placeMarker(pointCoordinates);
    } else {
      moveMarker(pointId, place.center[0], place.center[1]);
    }

    setAutocompleteSuggestions([]);
  };

  return (
    <div onClick={handleSelectSuggestion}>
      <p>{place.place_name}</p>
    </div>
  );
}
