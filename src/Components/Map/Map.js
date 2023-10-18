import ReactMapGL from "react-map-gl";
import useRouteContext from "../../Context/useRouteContext";
import Markers from "./Markers";
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
  const { markers, placeMarker, coordinates } = useRouteContext();

  const style = {
    "line-color": "rgba(3, 170, 238, 0.5)",
    "line-width": 5,
  };

  return (
    <ReactMapGL {...mapProps} onClick={placeMarker}>
      <Markers markers={markers} />
      <Route coordinates={coordinates} style={style} />
    </ReactMapGL>
  );
};

export default Map;
