import express from "express";
import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import authRoute from "./auth.route.js";
import genresRoute from "./genres.route.js";

const app = express();

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use("/genres", genresRoute);

export default app;
