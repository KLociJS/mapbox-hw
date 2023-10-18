import Map from "./Components/Map/Map";
import SideBar from "./Components/SideBar/SideBar";
import { MapContext } from "./Context/useMapContext";
import useRoutes from "./Hooks/useRoutes";
import useStyleRouteLine from "./Hooks/useStyleRouteLine";

function App() {
  const { markers, placeMarker, moveMarker, routeData, routeCoordinates } =
    useRoutes();
  const { lineWidth, setLineWidth, color, setColor } = useStyleRouteLine();

  return (
    <MapContext.Provider
      value={{
        markers,
        placeMarker,
        moveMarker,
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
