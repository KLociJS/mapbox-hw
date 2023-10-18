import ReactMapGL from "react-map-gl";
import useRouteContext from "../../Context/useRouteContext";
import MarkerWrapper from "./MarkerWrapper";
import Route from "./Route";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

const mapProps = {
  mapStyle: "mapbox://styles/mapbox/streets-v11",
  mapboxAccessToken: token,
  initialViewState: {
    longitude: 17.9,
    latitude: 47.1,
    zoom: 13,
  },
  style: { position: "relative", width: "80vw", height: "100vh" },
};

const Map = () => {
  const { markers, placeMarker, moveMarker, coordinates } = useRouteContext();

  const style = {
    "line-color": "rgba(3, 170, 238, 0.5)",
    "line-width": 5,
  };

  return (
    <ReactMapGL {...mapProps} onClick={placeMarker}>
      {markers.map((marker) => (
        <MarkerWrapper
          key={`${marker.lng}${marker.lat}`}
          marker={marker}
          moveMarker={moveMarker}
        />
      ))}
      <Route coordinates={coordinates} style={style} />
    </ReactMapGL>
  );
};

export default Map;