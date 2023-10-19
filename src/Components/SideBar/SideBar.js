import React from "react";
import useMapContext from "../../Context/useMapContext";
import Input from "./Input";
import "./SideBar.css";

export default function SideBar() {
  const {
    markers,
    allowedMarkers,
    activeMarkers,
    increaseAllowedMarker,
    color,
    setColor,
    lineWidth,
    setLineWidth,
    routeData,
  } = useMapContext();

  return (
    <div className='sidebar-container'>
      {markers.map((m, i) => (i < allowedMarkers ? <Input id={i} /> : null))}
      {activeMarkers === allowedMarkers ? (
        <button
          onClick={() => {
            console.log("clicker");
            increaseAllowedMarker();
          }}
        >
          Add new point
        </button>
      ) : null}
      <div className='route-info'>
        {routeData.distance ? (
          <p>Distance: {Math.round(routeData.distance)}m</p>
        ) : null}
        {routeData.duration ? (
          <p>Duration: {Math.round(routeData.duration)}s</p>
        ) : null}
      </div>
      <div className='accessibility-container'>
        <p>Edit Route appearance</p>
        <input
          type='color'
          name='color-picker'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type='range'
          name='route-line-width'
          min={5}
          max={15}
          step={1}
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
      </div>
    </div>
  );
}
