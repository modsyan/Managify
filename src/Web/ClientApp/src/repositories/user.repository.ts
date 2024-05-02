import { useQueryClient } from "react-query";
import axios from "axios";

type CreateUser = {
  name: string;
  email: string;
  role: string;
};

//catch repository errors and throw them to the component

class UserRepository {
  queryClient = useQueryClient();

  constructor() {}

  create = async (user: CreateUser) => {
    try {
      const response = await axios.post("/api/users", user);

      this.queryClient.invalidateQueries("allUsers");

      return response.data; // Return the created user data if needed
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  getAll = async () => {
    try {
      const response = await axios.get("http://localhost:5001/users");

      return response.data;
    } catch (error) {
      console.error("Error getting all users:", error);
      throw error;
    }
  };
  getById = async (id: string) => {
    try {
      const response = await axios.get(`/api/users/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  };
}

export default UserRepository;
