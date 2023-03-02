import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  // process.env.DATABASE_NAME,
  // process.env.DATABASE_USER,
  // process.env.DATABASE_PASSWORD,
  "db_btm_cinemas",
  "root",
  "",
  {
    host: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
    logging: false,
    define: {
      // prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
    pool: {
      max: 5, //maximum number of connection in pool
      min: 0, // minimum number of connection in pool
      acquire: 3000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, //maximum time, in milliseconds, that a connection can be idle before being released
    },
  }
);

export const connectDb = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.info("Database connected.");
    })
    .catch((err) => {
      console.error("ERROR - Unable to connect to the database:", err);
    });
};
