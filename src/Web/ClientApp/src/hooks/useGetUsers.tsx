import { useQuery } from "react-query";
import UserRepository from "../repositories/user.repository";

export const useGetUsers = () => {
  const userRepo = new UserRepository();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery("allUsers", userRepo.getAll);

  return { users, isLoading, isError };
};
