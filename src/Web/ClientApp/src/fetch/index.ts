// import { QueryClient } from "react-query";
// import { getLocalStorageJWT, isLoggedIn, signOut } from "./auth";
// import { EndpointConfig } from "../utils/constants/endpoints";
// import { ERRORS } from "../utils/constants/errors";
// const isDev = true;
// const API_HOST = isDev
//   ? `http://localhost:${window.location.port}`
//   : "https://api.codersquare.xyz";

// export class ApiError extends Error {
//   public status: number;

//   constructor(status: number, msg: string) {
//     super(msg);
//     this.status = status;
//   }
// }

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry(failureCount, error) {
//         const { status } = error as ApiError;
//         if (typeof status !== "number") {
//           console.error("got non-numeric error code:", error);
//           return true;
//         }
//         return status >= 500 && failureCount < 2;
//       },
//     },
//   },
// });

// export async function callEndpoint<Request, Response>(
//   endpoint: EndpointConfig,
//   request?: Request
// ): Promise<Response> {
//   const { url, method, auth } = endpoint;
//   const requestBody = request ? JSON.stringify(request) : undefined;
//   const response = await fetch(`${API_HOST}${url}`, {
//     method: method.toUpperCase(),
//     headers: {
//       "Content-Type": "application/json",
//       // We include an Authorization header when it's explicitly required or
//       // when the user is logged in.
//       ...((auth || isLoggedIn()) && {
//         Authorization: `Bearer ${getLocalStorageJWT()}`,
//       }),
//     },
//     body: requestBody,
//   });
//   if (!response.ok) {
//     let msg = "";
//     try {
//       msg = (await response.json()).error;
//       // Sign user out and refresh if the token has expired
//       if (msg === ERRORS.TOKEN_EXPIRED) {
//         signOut();
//         window.location.reload();
//       }
//     }
//   }
//   const isJson = response.headers
//     .get("content-type")
//     ?.includes("application/json");
//   return isJson ? ((await response.json()) as Response) : ({} as Response);
// }
