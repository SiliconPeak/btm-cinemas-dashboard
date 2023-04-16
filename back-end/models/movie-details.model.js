// import { DataType, DataTypes } from "sequelize";
// import { sequelize } from "../configs/db.config.js";
// import { Movie } from "./movie.model.js";
// import { Person } from "./person.model.js";

// export const MovieDetails = sequelize.define(
//     "movie_details", {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     status: {
//         type: DataTypes.STRING,
//         default: 'inactive'
//     }
// }, {
//     timestamps: true
// }
// )
// Person.hasMany(Movie);
// Movie.belongsTo(Person);

// Movie.belongsToMany(Person, {
//     through: 'movie_details'
// });
// Person.belongsToMany(Movie, {
//     through: 'movie_details'
// })

// sequelize.sync({ alter: true, force: true });
