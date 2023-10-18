import React from "react";
import useRouteContext from "../../Context/useRouteContext";
import useGetDirection from "../Map/Hooks/useGetDirection";
import "./SideBar.css";

export default function SideBar() {
  const { markers, setCoordinates } = useRouteContext();
  const { getDirectionsFetch } = useGetDirection(markers, setCoordinates);
  return (
    <div className='sidebar-container'>
      <button onClick={getDirectionsFetch}>Show route</button>
    </div>
  );
}
