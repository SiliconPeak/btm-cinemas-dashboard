import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usrName: {
      type: DataTypes.STRING,
    },
    usrPassword: {
      type: DataTypes.STRING,
      require: true,
    },
    usrEmail: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.STRING(30),
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    //freezeTableName: true,
  }
);
//sequelize.sync({ alter: true, force: true });
