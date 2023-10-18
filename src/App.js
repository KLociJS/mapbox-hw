import useMarker from "./Components/Map/Hooks/useMarker";
import useRoute from "./Components/Map/Hooks/useRoute";
import Map from "./Components/Map/Map";
import SideBar from "./Components/SideBar/SideBar";
import { RouteContext } from "./Context/useRouteContext";

function App() {
  const { markers, placeMarker } = useMarker();
  const { coordinates, setCoordinates } = useRoute();

  return (
    <RouteContext.Provider
      value={{ markers, placeMarker, coordinates, setCoordinates }}
    >
      <div className='app-container'>
        <SideBar />
        <Map />
      </div>
    </RouteContext.Provider>
  );
}

export default App;
