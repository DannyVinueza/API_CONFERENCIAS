import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Auditorios = sequelize.define('auditorios',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    codigo:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    nombre:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ubicacion:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    capacidad:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING(30),
        allowNull: false,
    }
},{
    tableName: 'auditorios',
    timestamps: false,
})

export default Auditorios;