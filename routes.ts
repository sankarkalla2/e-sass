/**
 * public routes that are accessible to the public
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * auth routes
 * array of routes that used  for authentication
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-email",
];

/**
 * @type {string}
 * The prefix api routes starting with api/auth
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logged or logged out
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
