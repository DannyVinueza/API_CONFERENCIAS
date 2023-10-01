import {Router} from 'express'
import verAutenticacion from '../middlewares/autenticacion.js';
import { listarReservas,
         registrarReserva,
         actualizarReserva,
         eliminarReserva
       } from "../controllers/reservas_controller.js";

const router = Router();

router.get('/reservas', verAutenticacion, listarReservas)
router.post('/reserva/registrar', verAutenticacion, registrarReserva)
router.put('/reserva/actualizar/:id', verAutenticacion, actualizarReserva)
router.delete('/reserva/eliminar/:id', verAutenticacion, eliminarReserva)

export default router;