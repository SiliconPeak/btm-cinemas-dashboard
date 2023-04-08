import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";
import { Movies } from "./movie.model.js";

export const Genres = sequelize.define(
    "geners", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'inactive'
    }
}, {
    timestamps: true,
});

Genres.hasMany(Movies, {
    foreignKey: 'generId',
    as: 'movie',
    allowNull: true
})
Movies.belongsTo(Genres, {
    foreignKey: 'generId',
    as: 'gener',
    allowNull: true
})
// sequelize.sync({ after: true, force: true });