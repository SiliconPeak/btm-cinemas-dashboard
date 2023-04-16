import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";
import { Person } from "./person.model.js";



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

MovieRole.hasMany(Person, {
    foreignKey: "roleId",
    as: "person",
    allowNull: true,
});

Person.belongsTo(MovieRole, {
    foreignKey: "roleId",
    as: "role",
    allowNull: true,

});

// sequelize.sync({ alter: true, force: true });
