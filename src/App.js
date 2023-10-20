import Map from "./Components/Map/Map";
import SideBar from "./Components/SideBar/SideBar";
import { MapContext } from "./Context/useMapContext";
import useRouteInfo from "./Hooks/useRouteInfo";
import useRoutes from "./Hooks/useRoutes";
import useStyleRouteLine from "./Hooks/useStyleRouteLine";

function App() {
  const {
    state: { markers, allowedMarkers, activeMarkers },
    increaseAllowedMarker,
    placeMarker,
    placeMarkerByAutocomplete,
    dragMarker,
    moveMarkerWithInput,
    removeMarker,
    dispatch,
  } = useRoutes();
  const { routeData, setRouteData } = useRouteInfo();
  const { lineWidth, setLineWidth, color, setColor } = useStyleRouteLine();

  return (
    <MapContext.Provider
      value={{
        markers,
        allowedMarkers,
        activeMarkers,
        placeMarker,
        placeMarkerByAutocomplete,
        dragMarker,
        moveMarkerWithInput,
        removeMarker,
        increaseAllowedMarker,
        routeData,
        setRouteData,
        dispatch,
        lineWidth,
        setLineWidth,
        color,
        setColor,
      }}
    >
      <div className='app-container'>
        <SideBar />
        <Map />
      </div>
    </MapContext.Provider>
  );
}

export default App;
