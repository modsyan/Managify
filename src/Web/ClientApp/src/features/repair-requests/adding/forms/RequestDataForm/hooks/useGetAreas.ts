import { useQuery } from "react-query";
import { getAreas } from "../api/get-areas.api";

export const useGetAreas = (levelId: string) => {
  const { data: areas, isLoading } = useQuery(["areas", levelId], () =>
    getAreas(levelId)
  );
  return { areas, isLoading };
};
