import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import useMarkerContext from "../../Context/useMarkerContext";
import useRouteInfoContext from "../../Context/useRouteContext";
import useRouteStyleContext from "../../Context/useRouteStyleContext";
import {
  distanceConverter,
  durationConverter,
} from "../../Utils/RouteInfoUtils";
import Input from "./Input";
import "./SideBar.css";

export default function SideBar() {
  const { markers, allowedMarkers, activeMarkers, increaseAllowedMarker } =
    useMarkerContext();
  const { routeData } = useRouteInfoContext();

  const { color, setColor, lineWidth, setLineWidth } = useRouteStyleContext();

  return (
    <div className='sidebar-container'>
      {/* Input fields */}
      {markers.map((m, i) => (i < allowedMarkers ? <Input id={i} /> : null))}
      {/* Add destination button */}
      {activeMarkers === allowedMarkers ? (
        <button onClick={increaseAllowedMarker} className='icon-button'>
          <AiOutlinePlusCircle className='icon' /> Add destination
        </button>
      ) : null}
      <div className='route-info-container'>
        {/*  */}
        {routeData.distance ? (
          <p className='route-info'>
            <GiPathDistance className='icon' />{" "}
            {distanceConverter(routeData.distance)}
          </p>
        ) : null}
        {routeData.duration ? (
          <p className='route-info'>
            <BiTimeFive className='icon' />{" "}
            {durationConverter(routeData.duration)}
          </p>
        ) : null}
      </div>
      <div className='accessibility-container'>
        <p className='accessibility-header'>Edit Route appearance</p>
        <div className='input-label-group'>
          <label className='input-label' htmlFor='color-picker'>
            Color
          </label>
          <input
            type='color'
            name='color-picker'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className='input-label-group'>
          <label className='input-label' htmlFor='route-line-width'>
            width
          </label>
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
    </div>
  );
}
