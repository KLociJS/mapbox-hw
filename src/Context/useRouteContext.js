import { createContext, useContext } from "react";

export const RouteInfoContext = createContext(null);

export default function useRouteInfoContext() {
  return useContext(RouteInfoContext);
}
