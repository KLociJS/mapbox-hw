import { useEffect, useState } from "react";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const GEOCODINGAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
const GEOPARAMS = `?access_token=${TOKEN}`;

const getLocationCode = (lng, lat) => {
  return `${lng},${lat}.json`;
};

const DIRECTINSAPI = `https://api.mapbox.com/directions/v5/mapbox/driving/`;
const DIRECTIONSPARAMS = `?geometries=geojson&access_token=${TOKEN}`;

const getLocations = (markers) => {
  return markers
    .reduce(
      (locations, currentLocation) =>
        (locations += `${currentLocation.lng},${currentLocation.lat};`),
      ""
    )
    .slice(0, -1);
};

export default function useRoutes() {
  const [markers, setMarkers] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeData, setRouteData] = useState({
    distance: null,
    duration: null,
  });
  const [markerLimit, setMarkerLimit] = useState(4);

  useEffect(() => {
    if (markers.length > 1) {
      const coordinates = getLocations(markers);
      fetch(DIRECTINSAPI + coordinates + DIRECTIONSPARAMS)
        .then((res) => res.json())
        .then((data) => {
          setRouteData({
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          });
          setRouteCoordinates(data.routes[0].geometry.coordinates);
        })
        .catch((err) => console.log(err));
    }
  }, [markers]);

  const placeMarker = ({ lngLat: { lng, lat } }) => {
    if (markers.length < markerLimit) {
      const locationCode = getLocationCode(lng, lat);

      fetch(GEOCODINGAPI + locationCode + GEOPARAMS)
        .then((res) => res.json())
        .then((data) =>
          setMarkers((prev) => [
            ...prev,
            {
              lng,
              lat,
              id: markers.length,
              place_name: data.features[0].place_name,
            },
          ])
        )
        .catch((err) => console.log(err));
    }
  };

  const moveMarker = (id, lng, lat) => {
    const locationCode = getLocationCode(lng, lat);

    fetch(GEOCODINGAPI + locationCode + GEOPARAMS)
      .then((res) => res.json())
      .then((data) => {
        setMarkers((prev) => {
          const currentMarker = prev.find((m) => m.id === id);
          currentMarker.lng = lng;
          currentMarker.lat = lat;
          currentMarker.place_name = data.features[0].place_name;
          return [...prev];
        });
      })
      .catch((err) => console.log(err));
  };

  return {
    markers,
    setMarkerLimit,
    placeMarker,
    moveMarker,
    routeCoordinates,
    routeData,
  };
}
