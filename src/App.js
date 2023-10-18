import Map from "./Components/Map/Map";
import SideBar from "./Components/SideBar/SideBar";
import { MapContext } from "./Context/useMapContext";
import useMarker from "./Hooks/useMarker";
import useRoute from "./Hooks/useRoute";
import useStyleRouteLine from "./Hooks/useStyleRouteLine";

function App() {
  const { markers, placeMarker, moveMarker } = useMarker();
  const { coordinates, setCoordinates } = useRoute();
  const { lineWidth, setLineWidth, color, setColor } = useStyleRouteLine();

  return (
    <MapContext.Provider
      value={{
        markers,
        placeMarker,
        moveMarker,
        coordinates,
        setCoordinates,
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
