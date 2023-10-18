import { createContext, useContext } from "react";

export const RouteContext = createContext(null);

export default function useRouteContext() {
  return useContext(RouteContext);
}
