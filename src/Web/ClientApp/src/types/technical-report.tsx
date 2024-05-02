export type TechnicalReport = {
  id: string;
  title: string;
  content: string;
  technicianName: string;
  createdAt: Date;
  updatedAt?: Date;
  exportDate?: Date;
};
