import Reservas from "../models/Reservas.js";
import sequelize from "../database.js";
import Conferencistas from "../models/Conferencistas.js";
import Auditorios from "../models/Auditorios.js";

const listarReservas = (req,res)=>{
    Reservas.findAll()
    .then((reservas)=>{
        res.status(200).json(reservas)
    })
    .catch((error)=>{
        console.log('Erro al listar las reservas', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const registrarReserva = async (req, res)=>{
    const {descripcion, conferencista, auditorio} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:'Debe llenar todos los campos'})
    const seConf = await Conferencistas.findOne({
        where:{
            nombre: req.body.conferencista
        }
    })
    if(!seConf) return res.status(400).json({msg:`El conferencista ${conferencista} no se encuentra registrado para asignarle a una reserva`})
    const seAudi = await Auditorios.findOne({
        where:{
            nombre: req.body.auditorio
        }
    })
    if(!seAudi) return res.status(400).json({msg:`El auditorio ${auditorio} no se encuentra registrado`})
    const codReser = 'RE-' + generarCodigo();
    const nuevaReserva = ({
        codigo: codReser,
        descripcion,
        id_conferencista: conferencista,
        id_auditorio: auditorio
    })
    await Reservas.create(nuevaReserva)
    .then(()=>{
        res.status(200).json({msg:'La reserva ha sido registrada'})
    })
    .catch((error)=>{
        console.log('Error al registrar la reserva: ', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const actualizarReserva = async (req,res)=>{
    const {id} = req.params
    const upReser = await Reservas.findByPk(id)
    if(!upReser) return res.status(400).json({msg:`La reserva ${id} no se encuentra registrada`})
    const seConf = await Conferencistas.findOne({
        where:{
            nombre: req.body.conferencista
        }
    })
    if(!seConf) return res.status(400).json({msg:`El conferencista ${req.body.conferencista} no se encuentra registrado para asignarle a una reserva`})
    const seAudi = await Auditorios.findOne({
        where:{
            nombre: req.body.auditorio
        }
    })
    if(!seAudi) return res.status(400).json({msg:`El auditorio ${req.body.auditorio} no se encuentra registrado`})
    const actResr = ({
        codigo: upReser.codigo,
        descripcion: req.body.descripcion || upReser?.descripcion,
        id_conferencista: req.body.conferencista || upReser?.id_conferencista,
        id_auditorio: req.body.auditorio || upReser?.id_auditorio
    })
    await Reservas.update(actResr,{
        where:{
            id: id
        }
    })
    .then(()=>{
        res.status(200).json({msg:'Reserva actualizada'})
    })
    .catch((error)=>{
        console.log('Error al actualizar la reserva', error)
        res.status(500).json({error:'Error interno del servidor'})
    })
}

const eliminarReserva = async (req,res)=>{
    const {id} = req.params
    const deReser = await Reservas.findByPk(id)
    if(!deReser) return res.status(400).json({msg:`La reserva ${id} no se encuentra registrada`})
    await deReser.destroy()
    .then(()=>{
        res.status(200).json({msg:'Reserva eliminada'})
    })
    .catch((error)=>{
        console.log('Error al eliminar la reserva', error)
        res.status(500).json('Error interno del servidor')
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
    listarReservas,
    registrarReserva,
    actualizarReserva,
    eliminarReserva
}