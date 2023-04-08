import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";


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

// Genres.hasMany(Movie, {
//     foreignKey: 'generId',
//     as: 'movie',
//     allowNull: true
// })
// Movie.belongsTo(Genres, {
//     foreignKey: 'generId',
//     as: 'gener',
//     allowNull: true
// })

// sequelize.sync({ after: true, force: true });

