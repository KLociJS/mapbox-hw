import { Marker } from "react-map-gl";

export default function MarkerWrapper({ marker, moveMarker }) {
  const handleMoveMarker = (dragEnd) => {
    const lat = dragEnd.lngLat.lat;
    const lng = dragEnd.lngLat.lng;
    moveMarker(marker.id, lng, lat);
  };

  return (
    <Marker
      key={`${marker.lng}${marker.lat}`}
      longitude={marker.lng}
      latitude={marker.lat}
      draggable={true}
      onDragEnd={handleMoveMarker}
    />
  );
}
