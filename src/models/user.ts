import { DataTypes } from "sequelize";

import { sequelize } from "../database";

export const User = sequelize.define(
    "User",
    {
        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true, notEmpty: true },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { notEmpty: true },
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        paranoid: true,
        tableName: "user",
        underscored: true,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ["username"],
            },
            {
                unique: true,
                fields: ["email"],
            },
        ],
    },
);