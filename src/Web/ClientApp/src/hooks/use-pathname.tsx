import { useLocation } from "react-router-dom";

export const usePathname = () => {
  // return the url including the query params and query string
  // e.g. /repair-requests?status=1
  const { pathname, search } = useLocation();
  return pathname + search;
};
