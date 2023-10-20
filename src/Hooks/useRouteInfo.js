import { useState } from "react";

export default function useRouteInfo() {
  const [routeData, setRouteData] = useState({
    duration: null,
    distance: null,
  });
  return {
    routeData,
    setRouteData,
  };
}
