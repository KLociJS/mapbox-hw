import { useState } from "react";

export default function useMarker() {
  const [markers, setMarkers] = useState([]);
  const [markerLimit, setMarkerLimit] = useState(2);

  const placeMarker = ({ lngLat: { lng, lat } }) => {
    if (markers.length < markerLimit) {
      setMarkers((prev) => [...prev, { lng, lat }]);
    }
  };

  return {
    markers,
    setMarkerLimit,
    placeMarker,
  };
}
