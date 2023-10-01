import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Conferencistas = sequelize.define('conferencistas',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    apellido:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    cedula:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    genero:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    ciudad:{
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    direccion:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    fecha_nacimiento:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    empresa:{
        type: DataTypes.STRING(20),
        allowNull: false,
    }
},{
    tableName: 'conferencistas',
    timestamps: false,
});

export default Conferencistas;