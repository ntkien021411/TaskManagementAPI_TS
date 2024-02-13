import express, { Express, Request, Response } from "express";
const app: Express = express();

//Connect Database
import * as database from "./config/database";
database.connect();

// ENV
import dotenv from "dotenv";
dotenv.config();
const port: Number | String = process.env.PORT || 3000;

import Task from "./models/task.model";
app.get("/tasks", async (req: Request, res: Response) => {
  const task = await Task.find({
    deleted: false,
  });

  res.json(task);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
