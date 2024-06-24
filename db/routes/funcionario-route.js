import express from 'express';
import funcionarioControllers from '../controller/funcionario.js';
const router = express.Router();

router
  .post('/', funcionarioControllers.post)
  .get('/', funcionarioControllers.getAll)
  .get('/codigoRegional/:codigoRegional', funcionarioControllers.getByCodReg)
  .get('/uf/:uf', funcionarioControllers.getByUf)
  .put('/codigoRegional/:codigoRegional', funcionarioControllers.put)
  .delete('/codigoRegional/:codigoRegional', funcionarioControllers.delete);

export default router;
