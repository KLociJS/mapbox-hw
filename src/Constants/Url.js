import TOKEN from "./Token";

//Base
const apiUrl = "https://api.mapbox.com/";

//Routes
const geoCodingRoute = `${apiUrl}geocoding/v5/mapbox.places/`;
const directionsRoute = `${apiUrl}directions/v5/mapbox/driving/`;

//Token param
const tokenFirstParam = `?access_token=${TOKEN}`;
const tokenNotFirstParam = `&access_token=${TOKEN}`;
const directionsParams = `?geometries=geojson&access_token=${TOKEN}`;

export {
  directionsParams,
  directionsRoute,
  geoCodingRoute,
  tokenFirstParam,
  tokenNotFirstParam,
};
