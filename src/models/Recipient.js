import e from "express";
import { DataTypes } from "sequelize";

import Adress from "./Adress.js";
import { sequelize } from "./db.js";

const Recipient = sequelize.define("Recipient", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  phone_number: DataTypes.STRING,
});

Recipient.hasMany(Adress, { foreignKey: "recipientId" });
// Adress.belongsTo(Recipient);

sequelize.sync();

export default { Recipient, sequelize };
