// import { DataTypes } from "sequelize";
// import { sequelize } from "../configs/db.config.js";

// export const Person = sequelize.define(
//     "persons",
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false,
//         },
//         name: {
//             type: DataTypes.STRING,
//         },
//         gender: {
//             type: DataTypes.STRING,
//         },
//         birthday: {
//             type: DataTypes.DATE,
//         },
//         deathday: {
//             type: DataTypes.DATE,
//         },
//         email: {
//             type: DataTypes.STRING,
//         },
//         contact: {
//             type: DataTypes.INTEGER,
//         },
//         birthPlace: {
//             type: DataTypes.STRING,
//         },
//         biography: {
//             type: DataTypes.STRING,
//         },
//         credits: {
//             type: DataTypes.INTEGER,
//         },
//         status: {
//             type: DataTypes.STRING(30),
//         },
//         profileImage: {
//             type: DataTypes.STRING,
//             defaultValue: null,
//         },
//     },
//     {
//         timestamps: true,
//         freezeTableName: true,
//     }
// );
// sequelize.sync({ alter: true, force: true });
