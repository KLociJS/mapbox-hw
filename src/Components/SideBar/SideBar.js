import React from "react";
import useMapContext from "../../Context/useMapContext";
import useGetDirection from "../../Hooks/useGetDirection";
import "./SideBar.css";

export default function SideBar() {
  const { markers, setCoordinates, color, setColor, lineWidth, setLineWidth } =
    useMapContext();
  const { getDirectionsFetch, routeData } = useGetDirection();
  return (
    <div className='sidebar-container'>
      <button onClick={() => getDirectionsFetch(markers, setCoordinates)}>
        Show route
      </button>
      <input
        type='color'
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        type='range'
        min={5}
        max={15}
        step={1}
        value={lineWidth}
        onChange={(e) => setLineWidth(e.target.value)}
      />
      {routeData.distance ? <p>Distance: {routeData.distance}</p> : null}
      {routeData.duration ? <p>Duration: {routeData.duration}</p> : null}
    </div>
  );
}
