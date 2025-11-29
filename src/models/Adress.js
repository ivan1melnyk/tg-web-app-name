import e from "express";
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

const Adress = sequelize.define("Adress", {
  country: DataTypes.STRING,
  city: DataTypes.STRING,
  street: DataTypes.STRING,
  post_code: DataTypes.STRING,
});

sequelize.sync();

export default Adress;
