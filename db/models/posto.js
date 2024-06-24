import mongoose from 'mongoose';

const postoSchema = new mongoose.Schema({
  codigoPosto: {
    type: String,
    required: true,
    index: true,
  },
  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  CEP: {
    type: String,
    required: true,
  },
  estoque: {
    type: {
      medicamento: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Medicamento',
      },
      quantidadeEstoque: {
        type: Number,
      },
      precoAtual: {
        type: Number,
      },
    },
  },
  funcionarios: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Funcionario',
    required: true,
  },
});

const posto = mongoose.model('Posto', postoSchema);

export default posto;
