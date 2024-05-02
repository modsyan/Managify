import axios from "axios";
import { RepairRequest } from "../types/repair-request-form";

class RepairRequestRepository {
  // Create a repair request
  async create(repairRequest: RepairRequest): Promise<RepairRequest> {
    try {
      const response = await axios.post(
        "http://localhost:3000/repair-requests",
        repairRequest
      );
      return response.data;
    } catch (error) {
      console.error("Error creating repair request:", error);
      throw error;
    }
  }

  // Read a repair request by ID
  async read(id: string): Promise<RepairRequest> {
    try {
      const response = await axios.get(
        `http://localhost:3000/repair-requests/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching repair request with ID ${id}:`, error);
      throw error;
    }
  }

  async update(
    id: string,
    repairRequest: RepairRequest
  ): Promise<RepairRequest> {
    try {
      const response = await axios.put(
        `http://localhost:3000/repair-requests/${id}`,
        repairRequest
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating repair request with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/repair-requests/${id}`);
    } catch (error) {
      console.error(`Error deleting repair request with ID ${id}:`, error);
      throw error;
    }
  }
}

export default RepairRequestRepository;
