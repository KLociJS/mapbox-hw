import { createContext, useContext } from "react";

export const MarkerContext = createContext(null);

export default function useMarkerContext() {
  return useContext(MarkerContext);
}
