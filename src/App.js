import Map from "./Components/Map/Map";
import SideBar from "./Components/SideBar/SideBar";
import { MapContext } from "./Context/useMapContext";
import useRoutes from "./Hooks/useRoutes";
import useStyleRouteLine from "./Hooks/useStyleRouteLine";

function App() {
  const {
    state: {
      markers,
      routeCoordinates,
      routeData,
      allowedMarkers,
      activeMarkers,
    },
    increaseAllowedMarker,
    placeMarker,
    placeMarkerByAutocomplete,
    dragMarker,
    moveMarkerWithInput,
    removeMarker,
  } = useRoutes();
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
        routeCoordinates,
        routeData,
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
