import mongoose from 'mongoose';
import Receita from '../models/receita.js';

// TODO: testar todos os métodos

// cria uma receita post
const receitaController = {
  post: async (req, res, next) => {
    try {
      let dados = req.body;

      // TODO: validar dados da nova receita
      let receita = new Receita(dados);

      await receita.save();
      res.status(201).send({
        message: 'Receita cadastrada com sucesso',
      });
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição post',
      });
    }
  },

  findPrescriptionByCode: async (req, res, next) => {
    // http://localhost:3000/receita/codigo/<cod_receita>
    try {
      let receita = await Receita.find({
        cod_receita: req.params.codigo,
      });

      res.status(200).send(receita);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição findPrescriptionByCode',
      });
    }
  },

  getAll: async (req, res, next) => {
    try {
      let receitas = await Receita.find({});

      res.status(200).send(receitas);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição findPrescriptionByCode',
      });
    }
  },

  findPrescriptionByPatient: async (req, res, next) => {
    //http://localhost:3000/receita/paciente/<cod-paciente>
    try {
      let receita = await Receita.find({
        paciente: req.params.paciente,
      });

      res.status(200).send(receita);
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição findPrescriptionByPatient',
      });
    }
  },

  // ??????
  updatePrescriptionByCode: async (req, res, next) => {
    try {
      let receita = await Receita.updateOne(
        {
          cod_receita: req.params.codigo,
        },
        { $set: req.body.newPrescription }
      );

      res.status(200).send({
        message: 'Receita atualizada com sucesso',
      });
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição updatePrescriptionByCode',
      });
    }
  },

  deletePrescriptionByCode: async (req, res, next) => {
    // http://localhost:3000/receita/codigo/codigo
    try {
      let receita = await Receita.deleteOne({
        cod_receita: req.params.codigo,
      });

      res.status(200).send({
        message: 'Receita deletada com sucesso',
      });
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar requisição deletePrescriptionByCode',
      });
    }
  },
};

// try {
//   await client.connect();
//   await createMultiplePrescriptions(client, [
//     {
//       cod_receita: '123',
//       receituario: {
//         medicamento: { nome: 'dipirona', codigo: '123456', preco: 25.48 },
//         frequencia: 2,
//         dose: 'comprimido 500 ml',
//       },
//       validade: '10/06/2024',
//       medico: 'muzzi',
//       paciente: 'jorge'
//     },
//     {
//       cod_receita: '123456',
//       receituario: {
//         medicamento: { nome: 'rivotril', codigo: '12356', preco: 25.48 },
//         frequencia: 2,
//         dose: 'comprimido 500 ml',
//       },
//       validade: '10/07/2024',
//       medico: 'pazuelo',
//       paciente: 'jun',
//     },
//   ]);
// } catch (e) {
//   console.error(e);
// }

// cria multiplos objetos receita
// async function createMultiplePrescriptions(client, newPrescriptions) {
//   const result = await client.db('test').collection('receitas').insertMany(newPrescriptions);

//   console.log(`${result.insertedCount} new prescription(s) created with the following id(s):`);
//   console.log(result.insertedIds);
// }

export default receitaController;
