import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function RemoveMarkerButton({ id, handleRemoveMarker }) {
  return (
    <>
      {id > 1 ? (
        <button onClick={handleRemoveMarker} className='icon-button'>
          <AiOutlineCloseCircle className='icon' />
        </button>
      ) : null}
    </>
  );
}
