import express, { Express, Request, Response } from "express";
const app: Express = express();

//Connect Database
import * as database from "./config/database";
database.connect();

// ENV
import dotenv from "dotenv";
dotenv.config();
const port: Number | String = process.env.PORT || 3000;

import mainV1Routes from "./api/v1/routes/index.route";
mainV1Routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
