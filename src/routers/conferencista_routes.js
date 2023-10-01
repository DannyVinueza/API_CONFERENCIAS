import { Router } from "express";
import verAutenticacion from "../middlewares/autenticacion.js";
import { 
        listarConferencistas,
        registrarConferencista,
        actualizarConferencista,
        eliminarConferencista
        } from "../controllers/conferencista_controllers.js";

const router = Router();

router.get('/conferencistas', listarConferencistas)
router.post('/conferencista/registrar', registrarConferencista)
router.put('/conferencista/actualizar/:id',actualizarConferencista)
router.delete('/conferencista/eliminar/:id', eliminarConferencista)

export default router;