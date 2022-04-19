import { sequelize } from "../database";
import { DataTypes } from "sequelize";

export const Container = sequelize.define("Container", {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
});
