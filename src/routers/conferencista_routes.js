import { Router } from "express";
import verAutenticacion from "../middlewares/autenticacion.js";
import { 
        listarConferencistas,
        registrarConferencista,
        actualizarConferencista,
        eliminarConferencista
        } from "../controllers/conferencista_controllers.js";

const router = Router();

router.get('/conferencistas',verAutenticacion, listarConferencistas)
router.post('/conferencista/registrar',verAutenticacion, registrarConferencista)
router.put('/conferencista/actualizar/:id',verAutenticacion, actualizarConferencista)
router.delete('/conferencista/eliminar/:id',verAutenticacion, eliminarConferencista)

export default router;