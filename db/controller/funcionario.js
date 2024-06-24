import mongoose from 'mongoose';
import Funcionario from '../models/funcionario.js';


const funcionarioControllers = {
  // cria um funcionario POST
  post: async (req, res, next) => {
    try {
      let dados = req.body;
      let funcionario = new Funcionario(dados);
      await funcionario.save();
      res.status(201).send({
        message: 'Funcionario cadastrado com sucesso!',
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
    async function findAllFuncionarios() {
      const cursor = Funcionario.find({});

      return cursor;
    }

    try {
      const data = await findAllFuncionarios();
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição',
      });
    }
  },

  getByCodReg: async (req, res, next) => {
    // retorna o funcionario pelo ceu crm
    async function findByCodReg(codreg) {
      let funcionario = await Funcionario.findOne({ 'codigoRegional': codreg });

      return funcionario;
    }

    try {
      const data = await findByCodReg(req.params.codigoRegional);
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByCodReg',
        erro: e,
      });
    }
  },

  getByUf: async (req, res, next) => {
    // retorna todos os funcionarios de um estado
    async function findByUf(uf) {
      let funcionario = await Funcionario.find({ 'uf': uf });

      return funcionario;
    }

    try {
      const data = await findByUf(req.params.uf);
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição getByUf',
        erro: e,
      });
    }
  },

  // atualizar um funcionario pelo codigo regional de atuacao
  put: async (req, res, next) => {
    // atualizar um funcionario, encontrado pelo codigo regional de atuacao
    async function updateWorkerByCodReg(codreg) {
      const result = await Paciente.updateOne(
        {'codigoRegional':codreg},
        {$set: newWorker}
      );
      return reseult;
    };

    try {
      let data = await updateWorkerByCodReg(req.params.codigoRegional);
      res.status(200).send({data: data, mensagem: "Sucesso ao atualizar o funcionário"});

    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição updateWorkerByCodReg',
      });
    }
  },

  delete: async (req, res, next) => {
    // excluir um funcionario pelo seu codigo regional
    async function deleteWorkerByCodReg(codreg) {
      const result = await Paciente.deleteOne({'codigoRegional':codreg});
    }

    try {
      await deleteWorkerByCodReg(req.params.codigoRegional);
      res.status(200).send({
        message: 'Funcionário removido com sucesso!',
      });
    } catch (e) {
      res.status(400).send({
        message: 'Falha ao remover funcionário',
        data: e,
      });
    }
  },


};

export default funcionarioControllers;
