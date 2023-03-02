import { DataTypes } from "sequelize";
import { sequelize } from "../configs/dbConfig.js";

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
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
//sequelize.sync({ alter: true, force: true });
