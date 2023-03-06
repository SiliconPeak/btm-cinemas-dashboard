import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";

import { User } from "./user.model.js";

export const Role = sequelize.define(
  "roles",
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "user",
  allowNull: true,
  onUpdate: "CASCADE",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
  allowNull: true,
  onUpdate: "CASCADE",
});

//sequelize.sync({ alter: true, force: true });
