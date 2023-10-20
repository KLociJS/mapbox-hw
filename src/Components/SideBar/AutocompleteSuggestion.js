import React from "react";
import useMarkerContext from "../../Context/useMarkerContext";

export default function AutocompleteSuggestion({
  pointId,
  place,
  setAutocompleteSuggestions,
}) {
  const { markers, placeMarkerByAutocomplete, moveMarkerWithInput } =
    useMarkerContext();

  const handleSelectSuggestion = () => {
    const currentPoint = markers.find((m) => m.id === pointId);

    //place a new marker or create a new one
    if (currentPoint.place === null) {
      placeMarkerByAutocomplete(
        place.center[0],
        place.center[1],
        place.place_name
      );
    } else {
      moveMarkerWithInput(
        pointId,
        place.center[0],
        place.center[1],
        place.place_name
      );
    }

    setAutocompleteSuggestions([]);
  };

  return (
    <div onClick={handleSelectSuggestion} className='autocomplete-suggestion'>
      <p>{place.place_name}</p>
    </div>
  );
}
