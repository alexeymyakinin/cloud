import { DataTypes } from "sequelize";

import { sequelize } from "../database";

export const Container = sequelize.define("Container", {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
});