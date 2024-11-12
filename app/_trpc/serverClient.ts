//The caller is used so we can run procedures from server components.

import { appRouter } from "@/server/routers/index";
import { createCallerfactory } from "@/server/trpc";

const createCaller = createCallerfactory(appRouter);
export const serverClient = createCaller({});
