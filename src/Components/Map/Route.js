import React from "react";
import { Layer, Source } from "react-map-gl";
import useMapContext from "../../Context/useMapContext";
import useDrawRoute from "../../Hooks/useDrawRoute";

export default function Route() {
  const { lineWidth, color, activeMarkers, markers, dispatch } =
    useMapContext();
  const { routeCoordinates } = useDrawRoute(activeMarkers, markers, dispatch);

  const data = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: routeCoordinates,
    },
  };

  const style = {
    "line-color": color,
    "line-width": +lineWidth,
  };

  return (
    <Source id='my-data' type='geojson' data={data}>
      <Layer
        id='lineLayer'
        type='line'
        source='my-data'
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={style}
      />
    </Source>
  );
}
