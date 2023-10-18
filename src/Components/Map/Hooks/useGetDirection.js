const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const APIURL = `https://api.mapbox.com/directions/v5/mapbox/driving/`;
const PARAMS = `?geometries=geojson&access_token=${TOKEN}`;

const example = `17.9,47.1;17.9,47.2`;

const getLocations = (markers) => {
  return markers
    .reduce(
      (locations, currentLocation) =>
        (locations += `${currentLocation.lng},${currentLocation.lat};`),
      ""
    )
    .slice(0, -1);
};

export default function useGetDirection(markers, setCoordinates) {
  const getDirectionsFetch = () => {
    const coordinates = getLocations(markers);
    fetch(APIURL + coordinates + PARAMS)
      .then((res) => res.json())
      .then((data) => setCoordinates(data.routes[0].geometry.coordinates))
      .catch((err) => console.log(err));
  };

  return { getDirectionsFetch };
}
