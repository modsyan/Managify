import axios from "axios";

// CRUD
type ResourceAsset = {
  id?: number; // Optional for create, required for update and delete
  name: string;
  resourceType: string;
};

class ResourceAssetRepository {
  async create(resourceAsset: ResourceAsset): Promise<ResourceAsset> {
    try {
      const response = await axios.post(
        "http://localhost:3000/resource-assets",
        resourceAsset
      );
      return response.data;
    } catch (error) {
      console.error("Error creating resource asset:", error);
      throw error;
    }
  }

  async get(id: number): Promise<ResourceAsset> {
    try {
      const response = await axios.get(
        `http://localhost:3000/resource-assets/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching resource asset with ID ${id}:`, error);
      throw error;
    }
  }

  async update(
    id: number,
    resourceAsset: ResourceAsset
  ): Promise<ResourceAsset> {
    try {
      const response = await axios.put(
        `http://localhost:3000/resource-assets/${id}`,
        resourceAsset
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating resource asset with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/resource-assets/${id}`);
    } catch (error) {
      console.error(`Error deleting resource asset with ID ${id}:`, error);
      throw error;
    }
  }
  async getAll(): Promise<ResourceAsset[]> {
    try {
      const response = await axios.get("http://localhost:3000/resource-assets");
      return response.data;
    } catch (error) {
      console.error("Error fetching resource assets:", error);
      throw error;
    }
  }
}

export default ResourceAssetRepository;
