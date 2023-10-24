import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function RemoveMarkerButton({
  handleRemoveMarker,
  activeMarkers,
}) {
  return (
    <>
      {activeMarkers > 2 ? (
        <button onClick={handleRemoveMarker} className='icon-button'>
          <AiOutlineCloseCircle className='icon' />
        </button>
      ) : null}
    </>
  );
}
