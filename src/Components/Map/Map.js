import ReactMapGL from "react-map-gl";
import TOKEN from "../../Constants/Token";
import useMarkerContext from "../../Context/useMarkerContext";
import MarkerWrapper from "./MarkerWrapper";
import Route from "./Route";

const mapProps = {
  mapStyle: "mapbox://styles/mapbox/streets-v11",
  mapboxAccessToken: TOKEN,
  initialViewState: {
    longitude: 17.9,
    latitude: 47.1,
    zoom: 13,
  },
  style: { position: "relative", width: "80vw", height: "100vh" },
};

const Map = () => {
  const { markers, placeMarker, dragMarker } = useMarkerContext();

  return (
    <ReactMapGL {...mapProps} onClick={placeMarker}>
      {markers.map((marker) =>
        marker.lng !== null ? (
          <MarkerWrapper
            key={`${marker.lng}${marker.lat}`}
            marker={marker}
            dragMarker={dragMarker}
          />
        ) : null
      )}
      <Route />
    </ReactMapGL>
  );
};

export default Map;
