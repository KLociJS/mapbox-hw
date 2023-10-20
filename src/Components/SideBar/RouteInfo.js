import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { GiPathDistance } from "react-icons/gi";
import useRouteInfoContext from "../../Context/useRouteContext";
import {
  distanceConverter,
  durationConverter,
} from "../../Utils/RouteInfoUtils";

export default function RouteInfo() {
  const { routeData } = useRouteInfoContext();
  return (
    <div className='route-info-container'>
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
  );
}
