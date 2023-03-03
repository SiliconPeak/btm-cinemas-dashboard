import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  errNotFound,
  errorHandler,
} from "./middlewares/error-handler.middleware.js";
import route from "./routes/index.js";
import { connectDb } from "./configs/dbConfig.js";

dotenv.config({ path: ".env" });

const PORT = process.env.DATABASE_PORT;
const HOST = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/assets", express.static(process.cwd() + "/public"));
app.use("/api/v1", route);
app.use(errNotFound);

app.use(errorHandler);

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log(`Error listening on port: ${PORT}`);
  } else {
    console.log(`Server listening on PORT ${PORT}`);
    console.log(`Press CTRL+C quit`);
    connectDb();
  }
});
