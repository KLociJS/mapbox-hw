import { useState } from "react";
import ReactMapGL, { Layer, Marker, Source } from "react-map-gl";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

const fetch = `https://api.mapbox.com/directions/v5/mapbox/driving/17.9,47.1;17.9,47.2?geometries=geojson&access_token=${token}`;

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const handleClick = ({ lngLat: { lng, lat } }) =>
    setMarkers((prev) => [...prev, { lng, lat }]);

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [17.900129, 47.099825],
        [17.899942, 47.099713],
      ],
    },
  };

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxAccessToken={token}
      initialViewState={{
        longitude: 17.9,
        latitude: 47.1,
        zoom: 11,
      }}
      style={{ width: 600, height: 400 }}
      onClick={handleClick}
    >
      {markers.map(({ lng, lat }) => (
        <Marker longitude={lng} latitude={lat} draggable={true} />
      ))}
      <Source id='my-data' type='geojson' data={dataOne}>
        <Layer
          id='lineLayer'
          type='line'
          source='my-data'
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "rgba(3, 170, 238, 0.5)",
            "line-width": 5,
          }}
        />
      </Source>
    </ReactMapGL>
  );
};

export default Map;
