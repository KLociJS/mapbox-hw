import React from "react";
import { Layer, Source } from "react-map-gl";
import useMarkerContext from "../../Context/useMarkerContext";
import useRouteStyleContext from "../../Context/useRouteStyleContext";
import useDrawRoute from "../../Hooks/useDrawRoute";

export default function Route() {
  const { activeMarkers, markers, dispatch } = useMarkerContext();
  const { routeCoordinates } = useDrawRoute(activeMarkers, markers, dispatch);
  const { lineWidth, color } = useRouteStyleContext();

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
