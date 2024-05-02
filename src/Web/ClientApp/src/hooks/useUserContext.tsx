import { useContext } from "react";
import { UserContext } from "../context/user-context";

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
