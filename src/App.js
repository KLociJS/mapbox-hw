//Components
import Map from "./Components/Map/Map";
import SideBar from "./Components/SideBar/SideBar";

//Context
import { MarkerContext } from "./Context/useMarkerContext";
import { RouteInfoContext } from "./Context/useRouteContext";
import { RouteStyleContext } from "./Context/useRouteStyleContext";

//Hooks
import useMarker from "./Hooks/useMarker";
import useRouteInfo from "./Hooks/useRouteInfo";
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
  } = useMarker();
  const { routeData, setRouteData } = useRouteInfo();
  const { lineWidth, setLineWidth, color, setColor } = useStyleRouteLine();

  return (
    <RouteStyleContext.Provider
      value={{ lineWidth, setLineWidth, color, setColor }}
    >
      <RouteInfoContext.Provider value={{ routeData, setRouteData }}>
        <MarkerContext.Provider
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
            dispatch,
          }}
        >
          <div className='app-container'>
            <SideBar />
            <Map />
          </div>
        </MarkerContext.Provider>
      </RouteInfoContext.Provider>
    </RouteStyleContext.Provider>
  );
}

export default App;
