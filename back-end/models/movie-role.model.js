import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";



export const MovieRole = sequelize.define(
    "movieRole",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: "inactive",
        },
    },
    {
        timestamps: true,
    }
);

// Role.hasMany(User, {
//     foreignKey: "roleId",
//     as: "user",
//     allowNull: true,
// });

// User.belongsTo(Role, {
//     foreignKey: "roleId",
//     as: "role",
//     allowNull: true,

// });

// sequelize.sync({ alter: true, force: true });
