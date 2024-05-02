export const ROUTES = {
  REPAIR_REQUESTS: {
    CREATE: "/repair-requests/create",
    GET_ALL: "/repair-requests",
    EDIT: (id: string) => `/repair-requests/${id}/edit`,
    VIEW: (id: string) => `/repair-requests/${id}`,
  },
  TECHNICAL_REPORTS: {
    CREATE: "/technical-reports/create",
    GEL_ALL: "/technical-reports",
    EDIT: (id: string) => `/technical-reports/${id}/edit`,
    VIEW: (id: string) => `/technical-reports/${id}`,
    EXPORT: "/technical-reports/:id/export",
    EXPORT_ALL: "/technical-reports/export",
  },
  LEVELS: {
    CREATE: "/levels/create",
    GET_ALL: "/levels",
    EDIT: "/levels/:id/edit",
    VIEW: "/levels/:id",
  },
  AREAS: {
    CREATE: "/areas/create",
    GET_ALL: "/areas",
    EDIT: "/areas/:id/edit",
    VIEW: "/areas/:id",
  },
  RESOURCE_ASSET_TYPES: {
    CREATE: "/resource-asset-types/create",
    GET_ALL: "/resource-asset-types",
    EDIT: (id: string) => `/resource-asset-types/${id}/edit`,
    VIEW: (id: string) => `/resource-asset-types/${id}`,
  },
  RESOURCE_ASSETS: {
    CREATE: "/resource-assets/create",
    GET_ALL: "/resource-assets",
    EDIT: (id: string) => `/resource-assets/${id}/edit`,
    VIEW: (id: string) => `/resource-assets/${id}`,
  },
  MAINTENANCE_MANAGEMENT: {
    CREATE_MAINTENANCE_MANAGEMENT: "/maintenance-management/create",
    GET_MAINTENANCE_MANAGEMENT: "/maintenance-management",
    EDIT_MAINTENANCE_MANAGEMENT: (id: string) =>
      `/maintenance-management/${id}/edit`,
    VIEW_MAINTENANCE_MANAGEMENT: (id: string) =>
      `/maintenance-management/${id}`,
    GET_PERIODIC_MAINTENANCE: (period: "daily" | "weekly" | "monthly") =>
      `/maintenance-management/${period}`,
  },
  CLEANING: {
    CREATE: "/cleaning/create",
    GET_ALL: "/cleaning",
    EDIT: (id: string) => `/cleaning/${id}/edit`,
    VIEW: (id: string) => `/cleaning/${id}`,
    GET_PERIODIC_CLEANING: (period: "daily" | "weekly" | "monthly") =>
      `/cleaning/${period}`,
  },
  USERS: {
    CREATE: "/users/create",
    GET_ALL: "/users",
    EDIT: (id: string) => `/users/${id}/edit`,
    VIEW: (id: string) => `/users/${id}`,
  },
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
  },
};
