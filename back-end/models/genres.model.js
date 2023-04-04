import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";

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

// sequelize.sync({ after: true, force: true });