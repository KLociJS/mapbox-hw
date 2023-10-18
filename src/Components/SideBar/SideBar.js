import React from "react";
import useRouteContext from "../../Context/useRouteContext";
import useGetDirection from "../Map/Hooks/useGetDirection";
import "./SideBar.css";

export default function SideBar() {
  const { markers, setCoordinates } = useRouteContext();
  const { getDirectionsFetch, routeData } = useGetDirection();
  return (
    <div className='sidebar-container'>
      <button onClick={() => getDirectionsFetch(markers, setCoordinates)}>
        Show route
      </button>
      {routeData.distance ? <p>Distance: {routeData.distance}</p> : null}
      {routeData.duration ? <p>Duration: {routeData.duration}</p> : null}
    </div>
  );
}
