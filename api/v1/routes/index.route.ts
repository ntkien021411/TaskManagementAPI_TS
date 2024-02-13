import { taskRoutes } from "../routes/task.route";
import { Express } from "express";
const mainV1Routes = (app: Express) :void => {
  const version = "/api/v1";
  app.use(version + "/tasks", taskRoutes);
  //   app.use(version + "/users", userRoutes);
};

export default mainV1Routes;
