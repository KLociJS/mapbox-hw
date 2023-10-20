import { createContext, useContext } from "react";

export const RouteStyleContext = createContext(null);

export default function useRouteStyleContext() {
  return useContext(RouteStyleContext);
}
