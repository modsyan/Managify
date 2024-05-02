import axios from "axios";
import { Area } from "../types";

class AreaRepository {
  async getAll(): Promise<Area[]> {
    try {
      const response = await axios.get("http://localhost:3000/areas");
      return response.data;
    } catch (error) {
      console.error("Error fetching areas:", error);
      throw error;
    }
  }

  async create(area: Area): Promise<Area> {
    try {
      const response = await axios.post("http://localhost:3000/areas", area);
      return response.data;
    } catch (error) {
      console.error("Error creating area:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Area> {
    try {
      const response = await axios.get(`http://localhost:3000/areas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching area with ID ${id}:`, error);
      throw error;
    }
  }

  async update(id: string, area: Area): Promise<Area> {
    try {
      const response = await axios.put(
        `http://localhost:3000/areas/${id}`,
        area
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating area with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/areas/${id}`);
    } catch (error) {
      console.error(`Error deleting area with ID ${id}:`, error);
      throw error;
    }
  }
}

export default AreaRepository;
