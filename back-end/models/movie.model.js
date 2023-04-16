import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";

export const Movies = sequelize.define(
    "movies",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        original_name: {
            type: DataTypes.STRING
        },
        adults: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        overview: {
            type: DataTypes.STRING
        },
        releaseDate: {
            type: DataTypes.DATE,
            require: true
        },
        language: {
            type: DataTypes.STRING
        },
        duration: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING(30),
            defaultValue: 'inactive'
        },
        posterUrl: {
            type: DataTypes.STRING,
            defaultValue: null
        },
    },
    {
        timestamps: true
    }
);
sequelize.sync({ alter: true, force: true });
