import axios from "axios";
import { Facility } from "../types";

class FacilityRepository {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3000/facilities") {
    this.baseUrl = baseUrl;
  }

  async getAll(): Promise<Facility[]> {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  async create(facility: Facility): Promise<Facility> {
    try {
      const response = await axios.post(this.baseUrl, facility);
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Facility> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  async update(id: string, facility: Facility): Promise<Facility> {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, facility);
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error("Axios error:", error);
      throw error;
    }
  }
}

export default FacilityRepository;
