import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Reservas = sequelize.define('reservas',{
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
    descripcion:{
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    id_conferencista:{
       type: DataTypes.STRING(30),
       allowNull: false,
    },
    id_auditorio:{
        type: DataTypes.STRING(30),
        allowNull: false,
    }
},{
    tableName: 'reservas',
    timestamps: false,
});

export default Reservas;