import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { extractRouterConfig } from "uploadthing/server";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
