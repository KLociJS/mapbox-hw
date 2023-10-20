import React from "react";
import useMarkerContext from "../../Context/useMarkerContext";
import AccessibilitySettings from "./AccessibilitySettings";
import AddDestinationButton from "./AddDestinationButton";
import Inputs from "./Inputs";
import RouteInfo from "./RouteInfo";
import "./SideBar.css";

export default function SideBar() {
  const { markers, allowedMarkers } = useMarkerContext();

  return (
    <div className='sidebar-container'>
      <Inputs markers={markers} allowedMarkers={allowedMarkers} />
      <AddDestinationButton />
      <RouteInfo />
      <AccessibilitySettings />
    </div>
  );
}
