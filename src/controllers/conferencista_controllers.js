import Conferencistas from "../models/Conferencistas.js";
import sequelize from "../database.js";

const listarConferencistas = async (req,res) => {
    const sql = 'SELECT * FROM conferencistas';

    sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    })
    .then((conferencistas)=>{
        res.status(200).json(conferencistas)
    })
    .catch((error)=>{
        console.erro('Error al obtner todos los conferencistas:', error)
        res.status(500).json({error: 'Error interno del servidor'})
    })
}

const registrarConferencista = async (req, res) =>{
    const {nombre, apellido, cedula, genero, ciudad, direccion, fecha_nacimiento, telefono, email, empresa} = req.body;
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})

    const confern = await Conferencistas.findOne({
        where:{
            cedula
        }
    })

    if(confern) return res.status(400).json({msg:'El conferencista con el # de ceula: ' + cedula + ' ya se encuentra registrado'})
    const sql = 'INSERT INTO conferencistas (nombre, apellido, cedula, genero, ciudad, direccion, fecha_nacimiento, telefono, email, empresa) VALUES (?,?,?,?,?,?,?,?,?,?)'
    
    sequelize.query(sql,{
        replacements:[
            nombre, 
            apellido, 
            cedula, 
            genero, 
            ciudad, 
            direccion, 
            fecha_nacimiento, 
            telefono, 
            email, 
            empresa
        ],
        type:sequelize.QueryTypes.INSERT,
    })
    .then(()=>{
        res.status(200).json({msg: 'Conferencista registrado'})
    })
    .catch((error)=>{
        console.log('Error al registrar al conferencista', error)
        res.status(500).json({error: 'Error interno del servidor'})
    })
}

const actualizarConferencista = async (req, res)=>{
    const {id} = req.params
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: 'Debe llenar todos los campos'})
    const upConf = await Conferencistas.findByPk(id)
    if(!upConf) return res.status(400).json({msg:`No encontramos al conferencista registrado ${id}`})
    if(upConf.cedula !== req.body.cedula){
        const upConfer = await Conferencistas.findOne({
            where: {cedula: req.body.cedula}
        })

        if(upConfer) return res.status(404).json({msg:'El conferencista con el # de ceula: ' + req.body.cedula + ' ya se encuentra registrado'})
    }

    const sql = 'UPDATE conferencistas SET nombre = ?, apellido = ?, cedula = ?, genero = ?, ciudad = ?, direccion = ?, fecha_nacimiento = ?, telefono = ?, email = ?, empresa = ? WHERE id = ?'
    sequelize.query(sql,{
        replacements:[
            upConf.nombre = req.body.nombre || upConf?.nombre, 
            upConf.apellido = req.body.apellido || upConf?.apellido, 
            upConf.cedula = req.body.cedula || upConf?.cedula, 
            upConf.genero = req.body.genero || upConf?.genero, 
            upConf.ciudad = req.body.ciudad || upConf?.ciudad, 
            upConf.direccion = req.body.direccion || upConf?.direccion, 
            upConf.fecha_nacimiento = req.body.fecha_nacimiento || upConf?.fecha_nacimiento, 
            upConf.telefono = req.body.telefono || upConf?.telefono, 
            upConf.email = req.body.email || upConf?.email, 
            upConf.empresa = req.body.empresa || upConf?.empresa,
            id
        ],
        type: sequelize.QueryTypes.UPDATE,
    })
    .then(()=>{
        res.status(200).json({msg:'Conferencista actualizado'})
    })
    .catch((error)=>{
        console.log('Error al actualizar al conferencista', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const eliminarConferencista = async (req, res)=>{
    const {id} = req.params
    const deleConf = await Conferencistas.findByPk(id)
    if(!deleConf) return res.status(400).json({msg:`No se encuentra el conferencista con id:${id}`})
    const sql = 'DELETE FROM conferencistas WHERE id = ?'
    sequelize.query(sql,{
        replacements:[
            id
        ]
    })
    .then(()=>{
        res.status(200).json({msg:'Conferencista eliminado satisfactoriamente'})
    })
    .catch((error)=>{
        console.log('Error al eliminar al conferencista: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

export{
    listarConferencistas,
    registrarConferencista,
    actualizarConferencista,
    eliminarConferencista
}