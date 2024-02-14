import express, { Express, Request, Response } from "express";
const app: Express = express();

//Body Parser New :Thay cho việc install thư viện bodyParser
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Connect Database
import * as database from "./config/database";
database.connect();

//CORS
// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
import cors from "cors"
app.use(cors());


// ENV
import dotenv from "dotenv";
dotenv.config();
const port: Number | String = process.env.PORT || 3000;

import mainV1Routes from "./api/v1/routes/index.route";
mainV1Routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
