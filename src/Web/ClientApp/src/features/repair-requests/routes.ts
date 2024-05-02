export const routes = [
  {
    path: "/repair-requests/create",
    next: "/contractor-data",
    prev: false,
  },
  {
    path: "/contractor-data",
    next: "/review",
    prev: "/repair-requests/create",
  },
  {
    path: "/review",
    next: false,
    prev: "/contractor-data",
  },
];
