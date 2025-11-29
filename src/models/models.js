import e from "express";
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

const Adress = sequelize.define("adress", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  country: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING },
  post_code: { type: DataTypes.STRING, allowNull: false },
});

const Recipient = sequelize.define("recipient", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  username: { type: DataTypes.STRING, unique: true },
  phone_number: { type: DataTypes.STRING },
});

const Commodity = sequelize.define("commodity", {
  title: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  description: { type: DataTypes.TEXT },
});

Recipient.hasMany(Adress, { foreignKey: "recipientId" });
Adress.belongsTo(Recipient);

sequelize.sync();

export { Adress, Recipient, Commodity };
