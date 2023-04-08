import express from "express";
import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import authRoute from "./auth.route.js";
import genresRoute from "./genres.route.js";
import genresMovieRoute from "./movie-role.route.js";

const app = express();

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use("/genres", genresRoute);
app.use("/movie-role", genresMovieRoute);

export default app;
