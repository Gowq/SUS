import express from 'express';
import pacienteControllers from '../controller/paciente.js';
const router = express.Router();

router
  .post('/', pacienteControllers.post)
  .get('/', pacienteControllers.getAll)
  .get('/cpf/:cpf', pacienteControllers.getByCPF)
  .put('/cpf/:cpf', pacienteControllers.put)
  .delete('/cpf/:cpf', pacienteControllers.delete);

export default router;
