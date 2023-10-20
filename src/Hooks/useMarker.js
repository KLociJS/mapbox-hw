import { useReducer } from "react";

import { geoCodingRoute, tokenFirstParam } from "../Constants/Url";

import { getLocationCode } from "../Utils/UrlUtils";

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
  activeMarkers: 0,
  allowedMarkers: 2,
};

export default function useMarker() {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  //Place marker by click
  const placeMarker = ({ lngLat: { lng, lat } }) => {
    if (
      state.activeMarkers < 24 &&
      state.allowedMarkers > state.activeMarkers
    ) {
      const locationCode = getLocationCode(lng, lat);
      fetch(geoCodingRoute + locationCode + tokenFirstParam)
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

  //Move marker with mouse
  const dragMarker = (id, lng, lat) => {
    const locationCode = getLocationCode(lng, lat);
    fetch(geoCodingRoute + locationCode + tokenFirstParam)
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

  //place marker by autocomplete
  const placeMarkerByAutocomplete = (lng, lat, place) => {
    dispatch({
      type: "choose_point",
      payload: { lng, lat, place },
    });
  };

  //Move marker with input
  const moveMarkerWithInput = (id, lng, lat, place) => {
    dispatch({
      type: "move_point",
      payload: {
        id,
        point: { lng, lat, place },
      },
    });
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
    placeMarkerByAutocomplete,
    dragMarker,
    moveMarkerWithInput,
    increaseAllowedMarker,
    removeMarker,
    dispatch,
  };
}
