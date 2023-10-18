import { useState } from "react";

export default function useMarker() {
  const [markers, setMarkers] = useState([]);
  const [markerLimit, setMarkerLimit] = useState(2);

  const placeMarker = ({ lngLat: { lng, lat } }) => {
    if (markers.length < markerLimit) {
      setMarkers((prev) => [...prev, { lng, lat, id: markers.length }]);
    }
  };

  const moveMarker = (id, lng, lat) => {
    setMarkers((prev) => {
      const otherMarkers = prev.filter((m) => m.id !== id);
      const currentMarker = prev.find((m) => m.id === id);
      return [...otherMarkers, { id: currentMarker.id, lng, lat }];
    });
  };

  return {
    markers,
    setMarkerLimit,
    placeMarker,
    moveMarker,
  };
}
