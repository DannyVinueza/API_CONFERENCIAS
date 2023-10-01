import {Router} from 'express'
import verAutenticacion from '../middlewares/autenticacion.js';
import { listarReservas,
         registrarReserva,
         actualizarReserva,
         eliminarReserva
       } from "../controllers/reservas_controller.js";

const router = Router();

router.get('/reservas', listarReservas)
router.post('/reserva/registrar', registrarReserva)
router.put('/reserva/actualizar/:id', actualizarReserva)
router.delete('/reserva/eliminar/:id', eliminarReserva)

export default router;