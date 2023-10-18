import { useState } from "react";

export default function useRoute() {
  const [coordinates, setCoordinates] = useState([
    [17.900129, 47.099825],
    [17.899942, 47.099713],
  ]);
  return {
    coordinates,
    setCoordinates,
  };
}
