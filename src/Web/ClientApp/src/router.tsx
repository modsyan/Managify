import { ReactNode } from "react";
import { CleaningTabsDetails } from "./features/cleaning-management/cleaning-tabs-details";
import { MaintenanceTabsDetails } from "./features/maintenance-management/maintenance-tabs-details";
import { AddAreaDetails } from "./pages/add-area-details";
import { AddAsset } from "./pages/add-asset";
import { AddLevelDetails } from "./pages/add-level-details";
import { AddUser } from "./pages/add-user";
import { LevelsDetails } from "./pages/levels-details";
import { Login } from "./pages/login";
import { ResourceAssetTypesDetails } from "./pages/resourceAssetTypesDetails";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

const createRoute = (path: string, element: ReactNode): RouteConfig => ({
  path,
  element,
});

export const ROUTES: Record<string, RouteConfig> = {
  LEVELS_CREATE: createRoute("/levels/create", <AddLevelDetails />),
  LEVELS_LIST: createRoute("/levels/list", <LevelsDetails />),
  LEVELS_EDIT: createRoute("/levels/:id/edit", <div>Edit Level</div>),
  LEVELS_VIEW: createRoute("/levels/:id", <div>View Level</div>),

  AREAS_CREATE: createRoute("/areas/create", <AddAreaDetails />),
  AREAS_LIST: createRoute("/areas/list", <div>Areas List</div>),
  AREAS_EDIT: createRoute("/areas/:id/edit", <div>Edit Area</div>),
  AREAS_VIEW: createRoute("/areas/:id", <div>View Area</div>),

  RESOURCE_ASSET_TYPES_CREATE: createRoute(
    "/resource-asset-types/create",
    <div>Create Resource Asset Type</div>
  ),
  RESOURCE_ASSET_TYPES_LIST: createRoute(
    "/resource-asset-types/list",
    <ResourceAssetTypesDetails />
  ),
  RESOURCE_ASSET_TYPES_EDIT: createRoute(
    "/resource-asset-types/:id/edit",
    <div>Edit Resource Asset Type</div>
  ),
  RESOURCE_ASSET_TYPES_VIEW: createRoute(
    "/resource-asset-types/:id",
    <div>View Resource Asset Type</div>
  ),

  RESOURCE_ASSETS_CREATE: createRoute("/resource-assets/create", <AddAsset />),
  RESOURCE_ASSETS_LIST: createRoute(
    "/resource-assets/list",
    <div>Resource Assets List</div>
  ),
  RESOURCE_ASSETS_EDIT: createRoute(
    "/resource-assets/:id/edit",
    <div>Edit Resource Asset</div>
  ),
  RESOURCE_ASSETS_VIEW: createRoute(
    "/resource-assets/:id",
    <div>View Resource Asset</div>
  ),

  MAINTENANCE_MANAGEMENT_CREATE: createRoute(
    "/maintenance-management/create",
    <div>Create Maintenance Management</div>
  ),
  MAINTENANCE_MANAGEMENT_LIST: createRoute(
    "/maintenance-management/list",
    <MaintenanceTabsDetails />
  ),
  MAINTENANCE_MANAGEMENT_EDIT: createRoute(
    "/maintenance-management/:id/edit",
    <div>Edit Maintenance Management</div>
  ),
  MAINTENANCE_MANAGEMENT_VIEW: createRoute(
    "/maintenance-management/:id",
    <div>View Maintenance Management</div>
  ),
  MAINTENANCE_MANAGEMENT_DAILY: createRoute(
    "/maintenance-management/daily",
    <div>Daily Maintenance Management</div>
  ),
  MAINTENANCE_MANAGEMENT_WEEKLY: createRoute(
    "/maintenance-management/weekly",
    <div>Weekly Maintenance Management</div>
  ),
  MAINTENANCE_MANAGEMENT_MONTHLY: createRoute(
    "/maintenance-management/monthly",
    <div>Monthly Maintenance Management</div>
  ),

  CLEANING_CREATE: createRoute("/cleaning/create", <div>Create Cleaning</div>),
  CLEANING_LIST: createRoute("/cleaning/list", <CleaningTabsDetails />),
  CLEANING_EDIT: createRoute("/cleaning/:id/edit", <div>Edit Cleaning</div>),
  CLEANING_VIEW: createRoute("/cleaning/:id", <div>View Cleaning</div>),
  CLEANING_DAILY: createRoute("/cleaning/daily", <div>Daily Cleaning</div>),
  CLEANING_WEEKLY: createRoute("/cleaning/weekly", <div>Weekly Cleaning</div>),
  CLEANING_MONTHLY: createRoute(
    "/cleaning/monthly",
    <div>Monthly Cleaning</div>
  ),

  USERS_CREATE: createRoute("/users/create", <AddUser />),
  USERS_LIST: createRoute("/users/list", <div>Users List</div>),
  USERS_EDIT: createRoute("/users/:id/edit", <div>Edit User</div>),
  USERS_VIEW: createRoute("/users/:id", <div>View User</div>),

  AUTH_LOGIN: createRoute("/login", <Login />),
  AUTH_LOGOUT: createRoute("/logout", <div>Logout</div>),
};
