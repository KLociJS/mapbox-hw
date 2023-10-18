import { createContext, useContext } from "react";

export const MapContext = createContext(null);

export default function useMapContext() {
  return useContext(MapContext);
}
