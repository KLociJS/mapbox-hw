import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useMarkerContext from "../../Context/useMarkerContext";

export default function AddDestinationButton() {
  const { increaseAllowedMarker, activeMarkers, allowedMarkers } =
    useMarkerContext();
  return (
    <>
      {activeMarkers === allowedMarkers ? (
        <button onClick={increaseAllowedMarker} className='icon-button'>
          <AiOutlinePlusCircle className='icon' /> Add destination
        </button>
      ) : null}
    </>
  );
}
