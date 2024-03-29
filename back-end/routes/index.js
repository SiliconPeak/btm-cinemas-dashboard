import express from "express";
import userRoute from "./user.route.js";
import roleRoute from "./role.route.js";
import authRoute from "./auth.route.js";
import genresRoute from "./genres.route.js";
import movieRoleRoute from "./movie-role.route.js";
import departmentRoute from "./department.route.js";
import personRoute from "./person.route.js";
import movieRoute from "./movie.route.js";

const app = express();

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use("/genres", genresRoute);
app.use("/movie-role", movieRoleRoute);
app.use("/department", departmentRoute);
app.use("/person", personRoute);
app.use("/movie", movieRoute);

export default app;
