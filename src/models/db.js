//import { Sequelize } from "sequelize";

// Temporary SQLite database for development purposes
// RAM if needed
// "sqlite::memory:teleg_db"
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// console.log("Connection has been established successfully.");

// // Get Congig
// console.log(
//   "Database path:",
//   sequelize.config.storage || sequelize.config.host
// );
// console.log("Full config:", sequelize.config);
// console.log(
//   "--------------------------------------------------------------------"
// );

export { sequelize };
