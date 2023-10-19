import { useEffect, useReducer } from "react";

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
        currentLocation.lng !== null
          ? (locations += `${currentLocation.lng},${currentLocation.lat};`)
          : locations,
      ""
    )
    .slice(0, -1);
};

const mapReducer = (state, action) => {
  switch (action.type) {
    case "choose_point": {
      let updatedPoints = state.markers.map((m) =>
        m.id === state.activeMarkers ? { ...m, ...action.payload } : m
      );
      return {
        ...state,
        markers: [...updatedPoints],
        activeMarkers: state.activeMarkers + 1,
      };
    }

    case "move_point": {
      let updatedPoints = state.markers.map((m) =>
        m.id === action.payload.id ? { ...m, ...action.payload.point } : m
      );
      return {
        ...state,
        markers: [...updatedPoints],
      };
    }

    case "delete_point": {
      let filteredPoints = state.markers.filter((m) => m.id !== action.payload);
      let updatedPoints = filteredPoints.map((m) =>
        m.id > action.payload ? { ...m, id: m.id - 1 } : m
      );
      updatedPoints.push({
        lng: null,
        lat: null,
        place: null,
        id: 23,
      });
      return {
        ...state,
        markers: [...updatedPoints],
        activeMarkers: state.activeMarkers - 1,
        allowedMarkers: state.allowedMarkers - 1,
      };
    }

    case "increase_number_of_allowed_markers": {
      return {
        ...state,
        allowedMarkers: state.allowedMarkers + 1,
      };
    }

    case "add_route": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      break;
  }
  throw new Error("Invalid map reducer action.");
};

const initialMarkers = [];

for (let i = 0; i < 24; i++) {
  initialMarkers.push({ lng: null, lat: null, place: null, id: i });
}

const initialState = {
  markers: initialMarkers,
  routeData: { distance: null, duration: null },
  routeCoordinates: [],
  activeMarkers: 0,
  allowedMarkers: 2,
};

export default function useRoutes() {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  useEffect(() => {
    if (state.activeMarkers > 1) {
      const coordinates = getLocations(state.markers);
      fetch(DIRECTINSAPI + coordinates + DIRECTIONSPARAMS)
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "add_route",
            payload: {
              routeCoordinates: data.routes[0].geometry.coordinates,
              routeData: {
                distance: data.routes[0].distance,
                duration: data.routes[0].duration,
              },
            },
          });
        })
        .catch((err) => console.log(err));
    }
  }, [state.markers, state.activeMarkers]);

  const placeMarker = ({ lngLat: { lng, lat } }) => {
    if (
      state.activeMarkers < 24 &&
      state.allowedMarkers > state.activeMarkers
    ) {
      const locationCode = getLocationCode(lng, lat);
      fetch(GEOCODINGAPI + locationCode + GEOPARAMS)
        .then((res) => res.json())
        .then((data) =>
          dispatch({
            type: "choose_point",
            payload: { lng, lat, place: data.features[0].place_name },
          })
        )
        .catch((err) => console.log(err));
    }
  };

  const moveMarker = (id, lng, lat) => {
    const locationCode = getLocationCode(lng, lat);
    fetch(GEOCODINGAPI + locationCode + GEOPARAMS)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "move_point",
          payload: {
            id,
            point: { lng, lat, place: data.features[0].place_name },
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const increaseAllowedMarker = () => {
    dispatch({ type: "increase_number_of_allowed_markers" });
  };

  const removeMarker = (id) => {
    dispatch({ type: "delete_point", payload: id });
  };

  return {
    state,
    placeMarker,
    moveMarker,
    increaseAllowedMarker,
    removeMarker,
  };
}
