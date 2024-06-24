import mongoose from 'mongoose';
import Consulta from '../models/consulta.js';
// const Consulta = mongoose.model('Consulta');

const consultaControllers = {
  // cria uma consulta POST
  post: async (req, res, next) => {
    try {
      let dados = req.body;

      print("consulta!!!")
      print(dados)


      // TODO: validar dados da nova consulta
      let consulta = new Consulta(dados);
      await consulta.save();
      res.status(201).send({
        message: 'Consulta cadastrado com sucesso!',
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: 'Falha ao processar requisição',
        data: e,
      });
    }
  },

  getAll: async (req, res, next) => {
    async function findAllConsultas() {
      const cursor = Consulta.find({});

      return cursor;
    }

    try {
      const data = await findAllConsultas();
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição',
      });
    }
  },

  // retorna todas as consultas de um determinado paciente
  getByPatient: async (req, res, next) => {
    // retorna todas as consultas de um determinado paciente
    async function findByPatient(patient) {
      let consulta = await Consulta.find({ 'codigo.paciente': patient });

      return consulta;
    }

    try {
      // {
      //   "codigo": {
      //     "paciente": ""
      //   }
      // }
      const data = await findByPatient(req.body.codigo['paciente']);

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByPatient',
        erro: e,
      });
    }
  },

  // cria multiplos objetos consulta
  // async function createMultipleAppointments(client, newAppointments) {
  //   let consulta = new Consulta({
  //     codigo: {
  //       medico: 'pazuelo',
  //       paciente: 'jun',
  //       dataConsulta: '11/06/2023',
  //     },
  //     dadosReceita: ['cloroquina', 'ivermectina'],
  //   });
  //   await consulta.save();

  //   // const result = await client.db('test').collection('consultas').insertMany(newAppointments);

  //   // console.log(`${result.insertedCount} new appointments(s) created with the following id(s):`);
  //   // console.log(result.insertedIds);
  // }

  // retorna consulta buscada pela tupla (medico, paciente, data)
  getByTuple: async (req, res, next) => {
    // retorna consulta buscada pela tupla (medico, paciente, data) - isso vai ser mudado para a funcao abaixo getByTuple
    async function findOneAppointmentByTuple(data) {
      const result = await Consulta.findOne({
        'codigo.medico': data.medico,
        'codigo.paciente': data.paciente,
        'codigo.dataConsulta': data.dataConsulta,
      });

      console.log(result);

      return result;
    }

    try {
      // {
      //   "codigo": {
      //     "medico": "",
      //     "paciente": "",
      //     "dataConsulta": ""
      //   }
      // }
      const data = await findOneAppointmentByTuple(req.body.codigo);
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByConsulta',
      });
    }
  },

  //atualizar uma determinada consulta
  put: async (req, res, next) => {
    //atualizar uma determinada consulta
    async function updateAppointmentByTuple(doctor, patient, date, newAppointment) {
      const result = await Consulta.updateOne(
        {
          'codigo.medico': doctor,
          'codigo.paciente': patient,
          'codigo.dataConsulta': date,
        },
        { $set: newAppointment }
      );

      return result;
    }
    try {
      // {
      //   "codigo": {
      //     "medico": "",
      //     "paciente": "",
      //     "dataConsulta": ""
      //   },
      //   "newAppointment": {
      //     "codigo": {
      //       "medico": "",
      //       "paciente": "",
      //       "dataConsulta": ""
      //     },
      //     "dadosReceita": [
      //       "",
      //       "",
      //       ""
      //     ]
      //   }
      // }
      let data = await updateAppointmentByTuple(
        req.body.codigo.medico,
        req.body.codigo.paciente,
        req.body.codigo.dataConsulta,
        req.body.newAppointment
      );

      res.status(200).send({ data: data, mensagem: 'Sucesso ao atualizar a consulta' });
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição updateAppointmentByTuple',
      });
    }
  },

  delete: async (req, res, next) => {
    // excluir uma consulta especifica
    async function deleteAppointmentByTuple(doctor, patient, date) {
      const result = await Consulta.deleteOne({
        'codigo.medico': doctor,
        'codigo.paciente': patient,
        'codigo.dataConsulta': date,
      });
    }

    try {
      await deleteAppointmentByTuple(
        req.body.codigo.medico,
        req.body.codigo.paciente,
        req.body.codigo.dataConsulta
      );
      res.status(200).send({
        message: 'Consulta removida com sucesso!',
      });
    } catch (e) {
      res.status(400).send({
        message: 'Falha ao remover consulta',
        data: e,
      });
    }
  },
};

export default consultaControllers;
