import express from "express";
import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import authRoute from "./auth.route.js";

const app = express();

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);

export default app;
