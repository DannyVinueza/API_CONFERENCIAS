import {Router} from 'express'
import verAutenticacion from '../middlewares/autenticacion.js';
import { listarAuditorios,
         registrarAuditorio,
         actualizarAuditorio,
         eliminarAuditorio
        } from "../controllers/auditorios_controller.js";

const router = Router();

router.get('/auditorios', listarAuditorios)
router.post('/auditorio/registrar', registrarAuditorio)
router.put('/auditorio/actualizar/:id', actualizarAuditorio)
router.delete('/auditorio/eliminar/:id', eliminarAuditorio)


export default router;