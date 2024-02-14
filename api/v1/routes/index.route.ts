import { taskRoutes } from "../routes/task.route";
import { userRoutes } from "./user.route";
import { Express } from "express";
import { requireAuth } from './../middlewares/auth.middleware';

const mainV1Routes = (app: Express): void => {
  const version = "/api/v1";
  app.use(version + "/tasks",requireAuth, taskRoutes);
  app.use(version + "/users", userRoutes);
};

export default mainV1Routes;
