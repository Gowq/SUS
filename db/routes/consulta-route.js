import express from 'express';
import consultaControllers from '../controller/consulta.js';
const router = express.Router();

router
  .post('/', consultaControllers.post)
  .get('/', consultaControllers.getAll)
  .get('/patient', consultaControllers.getByPatient)
  .get('/tuplaConsulta', consultaControllers.getByTuple)
  .put('/', consultaControllers.put)
  .delete('/', consultaControllers.delete);

export default router;
