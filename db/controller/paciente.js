import mongoose from 'mongoose';
import Paciente from '../models/paciente.js';


const pacienteControllers = {
  // POST
  post: async (req, res, next) => {
    try {
      let dados = req.body;
      let paciente = new Paciente(dados);
      
      await paciente.save();
      res.status(201).send({
        message: 'paciente cadastrado com sucesso!',
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: 'Falha ao processar requisição',
        data: e,
      });
    }
  },

  // GET ALL - todos os pacientes da base
  getAll: async (req, res, next) => {
    async function findAllPacientes() {
      const cursor = Paciente.find({});

      return cursor;
    }

    try {
      const data = await findAllPacientes();
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição',
      });
    }
  },

  // retorna o paciente buscado pelo seu cpf
  getByCPF: async (req, res, next) => {
    // retorna o paciente buscado pelo seu cpf
    async function findByCpf(cpf) {
      let paciente = await Paciente.findOne({'cpf': cpf});

      return paciente;
    }

    try {
      const data = await findByCpf(req.params.cpf);

      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByCPF',
        erro: e
      });
    }
  },

  // atualizar um paciente pelo cpf
  put: async (req, res, next) => {
    // atualizar um paciente, encontrado pelo cpf
    async function updatePatientByCpf(cpf) {
      const result = await Paciente.updateOne(
        {'cpf':cpf},
        {$set: newPatient}
      );
      return reseult;
    };

    try {
      let data = await updatePatientByCpf(req.body.cpf)
      res.status(200).send({data: data, mensagem: "Sucesso ao atualizar o paciente"});

    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição updateAppointmentByTuple',
      });
    }
  },

  delete: async (req, res, next) => {
    // excluir um paciente pelo cpf
    async function deletePatienteByCpf(cpf) {
      const result = await Paciente.deleteOne({'cpf':cpf});
    }

    try {
      await deletePatienteByCpf(req.params.cpf);
      res.status(200).send({
        message: 'Paciente removida com sucesso!',
      });
    } catch (e) {
      res.status(400).send({
        message: 'Falha ao remover paciente',
        data: e,
      });
    }
  },



};

export default pacienteControllers;


