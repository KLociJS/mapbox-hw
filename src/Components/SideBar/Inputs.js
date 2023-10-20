import React from "react";
import Input from "./Input";

export default function Inputs({ markers, allowedMarkers }) {
  return (
    <>
      {markers.map((_, i) =>
        i < allowedMarkers ? <Input key={i} id={i} /> : null
      )}
    </>
  );
}
