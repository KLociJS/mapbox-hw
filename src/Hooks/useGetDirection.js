import { useState } from "react";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const APIURL = `https://api.mapbox.com/directions/v5/mapbox/driving/`;
const PARAMS = `?geometries=geojson&access_token=${TOKEN}`;

const getLocations = (markers) => {
  return markers
    .reduce(
      (locations, currentLocation) =>
        (locations += `${currentLocation.lng},${currentLocation.lat};`),
      ""
    )
    .slice(0, -1);
};

export default function useGetDirection() {
  const [routeData, setRouteData] = useState({
    distance: null,
    duration: null,
  });

  const getDirectionsFetch = (markers, setCoordinates) => {
    console.log(markers);
    const coordinates = getLocations(markers);
    fetch(APIURL + coordinates + PARAMS)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRouteData({
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
        });
        setCoordinates(data.routes[0].geometry.coordinates);
      })
      .catch((err) => console.log(err));
  };

  return { getDirectionsFetch, routeData };
}
