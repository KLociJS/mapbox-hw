import { useEffect, useState } from "react";
import { directionsParams, directionsRoute } from "../Constants/Url";
import useMapContext from "../Context/useMapContext";
import { getLocationCodes } from "../Utils/UrlUtils";

export default function useDrawRoute(activeMarkers, markers, dispatch) {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const { setRouteData } = useMapContext();

  // Draw route
  useEffect(() => {
    if (activeMarkers > 1) {
      const coordinates = getLocationCodes(markers);
      fetch(directionsRoute + coordinates + directionsParams)
        .then((res) => res.json())
        .then((data) => {
          setRouteCoordinates(data.routes[0].geometry.coordinates);
          setRouteData({
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [markers, activeMarkers, dispatch, setRouteData]);

  return {
    routeCoordinates,
  };
}
