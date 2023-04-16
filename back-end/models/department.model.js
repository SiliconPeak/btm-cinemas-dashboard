import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";
import { Person } from "./person.model.js";


export const Department = sequelize.define(
    "departments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'inactive'
    }
}, {
    timestamps: true,
});

Department.hasMany(Person, {
    foreignKey: "departmentId",
    as: "person",
    allowNull: true,
});

Person.belongsTo(Department, {
    foreignKey: "departmentId",
    as: "department",
    allowNull: true,

});
// sequelize.sync({ after: true, force: true });

