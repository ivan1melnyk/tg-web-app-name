import e from "express";
import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

const Commodity = sequelize.define("Commodity", {
  title: DataTypes.STRING,
  price: DataTypes.FLOAT,
  description: DataTypes.TEXT,
});

sequelize.sync();

export default Commodity;
