import React from "react";
import { Layer, Source } from "react-map-gl";

export default function Route({ coordinates, style }) {
  const data = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
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
