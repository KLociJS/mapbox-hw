import { Marker } from "react-map-gl";

export default function Markers({ markers }) {
  return (
    <>
      {markers.map(({ lng, lat }) => (
        <Marker
          key={lng + lat}
          longitude={lng}
          latitude={lat}
          draggable={true}
        />
      ))}
    </>
  );
}
