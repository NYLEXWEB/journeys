import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { getCleanUploadThingToken } from "@/lib/uploadthing-server";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: getCleanUploadThingToken(),
  },
});
