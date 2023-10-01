import {Router} from 'express'
import verAutenticacion from '../middlewares/autenticacion.js';
import { listarAuditorios,
         registrarAuditorio,
         actualizarAuditorio,
         eliminarAuditorio
        } from "../controllers/auditorios_controller.js";

const router = Router();

router.get('/auditorios', verAutenticacion, listarAuditorios)
router.post('/auditorio/registrar', verAutenticacion, registrarAuditorio)
router.put('/auditorio/actualizar/:id', verAutenticacion, actualizarAuditorio)
router.delete('/auditorio/eliminar/:id', verAutenticacion, eliminarAuditorio)


export default router;