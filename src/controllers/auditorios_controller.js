import Auditorios from "../models/Auditorios.js";
import sequelize from "../database.js";
import { QueryTypes } from "sequelize";

const listarAuditorios = async (req,res)=>{
    const sql = 'SELECT * FROM auditorios'
    sequelize.query(sql,{
        type: sequelize.QueryTypes.SELECT
    })
    .then((auditorios)=>{
        res.status(200).json(auditorios)
    })
    .catch((error)=>{
        console.log('Error al obtener todos los auditorios', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const registrarAuditorio = async (req,res)=>{
    const {nombre, ubicacion, capacidad, descripcion} = req.body;
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Llene todos los campos'})
    const regAudi = await Auditorios.findOne({
        where:{
            nombre
        }
    })

    if(regAudi) return res.status(400).json({msg:`Auditorio con el nombre ${nombre} ya se encuentra registrado`})
    const sql = 'INSERT INTO auditorios (codigo, nombre, ubicacion, capacidad, descripcion) VALUES (?,?,?,?,?)'
    const codigoRan = "AU-" + generarCodigo()
    sequelize.query(sql, {
        replacements:[
            codigoRan,
            nombre,
            ubicacion,
            capacidad,
            descripcion
        ],
        type: sequelize.QueryTypes.INSERT
    })
    .then(()=>{
        res.status(200).json({msg:'Auditorio registrado'})
    })
    .catch((error)=>{
        console.log('Error al registrar el auditorio: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })

}

const actualizarAuditorio = async (req,res) =>{
    const {id} = req.params
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})
    const upAudi = await Auditorios.findByPk(id)
    if(!upAudi) return res.status(400).json({msg:`No encontramos al auditorio registrado ${id}`})
    if(upAudi.nombre !== req.body.nombre){
        const upAudNom = Auditorios.findOne({
            where:{
                nombre: req.body.nombre
            }
        })
        if(upAudNom) return res.status(404).json({msg:`El auditorio con el nombre ${req.body.nombre} ya se encuentra registrado`})
    }

    const sql = 'UPDATE auditorios SET codigo = ?, nombre = ?, ubicacion = ?, capacidad = ?, descripcion = ? WHERE id = ?'
    sequelize.query(sql,{
        replacements:[
            upAudi.codigo = upAudi.codigo,
            upAudi.nombre = req.body.nombre || upAudi?.nombre,
            upAudi.ubicacion = req.body.ubicacion || upAudi?.ubicacion,
            upAudi.capacidad = req.body.capacidad || upAudi?.capacidad,
            upAudi.descripcion = req.body.descripcion || upAudi?.descripcion,
            id
        ],
        type: sequelize.QueryTypes.UPDATE
    })
    .then(()=>{
        res.status(200).json({msg:'Auditorio actualizado'})
    })
    .catch((error)=>{
        console.log('Error al actualizar el auditorio:', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const eliminarAuditorio = async (req, res)=>{
    const {id} = req.params
    const delAudi = await Auditorios.findByPk(id)
    if(!delAudi) return res.status(400).json({msg:`El auditorio con id ${id} no se encuentra registrado`})

    const sql = 'DELETE FROM auditorios WHERE id = ?'
    sequelize.query(sql,{
        replacements:[
            id
        ],
        type: sequelize.QueryTypes.DELETE
    })
    .then(()=>{
        res.status(200).json({msg:'Auditorio eliminado'})
    })
    .catch((error)=>{
        console.log('Error al eliminar el auditorio: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

function generarCodigo(){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaRandom = '';

    for(let i = 0; i < 10; i++){
        const indiceRandom = Math.floor(Math.random() * caracteres.length);
        cadenaRandom += caracteres.charAt(indiceRandom)
    }

    return cadenaRandom;
}

export{
    listarAuditorios,
    registrarAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
}