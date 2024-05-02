export type EndpointConfig = {
  url: string;
  method: "patch" | "get" | "post" | "delete";
  auth?: boolean;
  sensitive?: boolean; // Skips logging request body
};

export enum Endpoints {
  login = "login",
  register = "register",

  get_users = "get_users",
  get_user = "get_user",

  get_repair_requests = "get_repair_requests",
  get_repair_request = "get_repair_request",
  create_repair_request = "create_repair_request",
  update_repair_request = "update_repair_request",
  delete_repair_request = "delete_repair_request",

  get_technical_requests = "get_technical_requests",
  get_technical_request = "get_technical_request",
  create_technical_request = "create_technical_request",
  update_technical_request = "update_technical_request",
  delete_technical_request = "delete_technical_request",
}

export function withParams(
  endpoint: EndpointConfig,
  ...params: string[]
): EndpointConfig {
  let url = endpoint.url;
  const placeholders = url.match(/:[^/]*/g) || [];
  if (placeholders.length !== params.length) {
    throw `Too ${
      placeholders.length < params.length ? "many" : "few"
    } params for url: ${url}!`;
  }
  for (let index = 0; index < params.length; index++) {
    url = url.replace(placeholders[index], params[index]);
  }
  return {
    url: url,
    method: endpoint.method,
    auth: endpoint.auth,
  } as EndpointConfig;
}

export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  [Endpoints.login]: {
    url: "/api/v1/auth/login",
    method: "post",
    auth: false,
    sensitive: true,
  },
  [Endpoints.register]: {
    url: "/api/v1/auth/register",
    method: "post",
    auth: false,
    sensitive: true,
  },
  [Endpoints.get_users]: {
    url: "/api/v1/users",
    method: "get",
    auth: true,
  },
  [Endpoints.get_user]: {
    url: "/api/v1/users/:id",
    method: "get",
    auth: true,
  },
  [Endpoints.get_repair_requests]: {
    url: "/api/v1/repair_requests",
    method: "get",
    auth: true,
  },
  [Endpoints.get_repair_request]: {
    url: "/api/v1/repair_requests/:id",
    method: "get",
    auth: true,
  },
  [Endpoints.create_repair_request]: {
    url: "/api/v1/repair_requests",
    method: "post",
    auth: true,
  },
  [Endpoints.update_repair_request]: {
    url: "/api/v1/repair_requests/:id",
    method: "patch",
    auth: true,
  },
  [Endpoints.delete_repair_request]: {
    url: "/api/v1/repair_requests/:id",
    method: "delete",
    auth: true,
  },
  [Endpoints.get_technical_requests]: {
    url: "/api/v1/technical_requests",
    method: "get",
    auth: true,
  },
  [Endpoints.get_technical_request]: {
    url: "/api/v1/technical_requests/:id",
    method: "get",
    auth: true,
  },
  [Endpoints.create_technical_request]: {
    url: "/api/v1/technical_requests",
    method: "post",
    auth: true,
  },
  [Endpoints.update_technical_request]: {
    url: "/api/v1/technical_requests/:id",
    method: "patch",
    auth: true,
  },
  [Endpoints.delete_technical_request]: {
    url: "/api/v1/technical_requests/:id",
    method: "delete",
    auth: true,
  },
};
