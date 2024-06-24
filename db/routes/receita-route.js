import express from 'express';
import receitaControllers from '../controller/receita.js';
const router = express.Router();

router
  .post('/', receitaControllers.post)
  .get('/', receitaControllers.getAll)
  .get('/codigo/:codigo', receitaControllers.findPrescriptionByCode)
  .get('/paciente/:paciente', receitaControllers.findPrescriptionByPatient)
  .put('/codigo/:codigo', receitaControllers.updatePrescriptionByCode)
  .delete('/codigo/:codigo', receitaControllers.deletePrescriptionByCode);

export default router;
