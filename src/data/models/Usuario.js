import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM("admin", "cliente"),
        defaultValue: "cliente"
    }
}, {
    tableName: "usuarios",
    timestamps: true
});