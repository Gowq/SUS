import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  codigoPedido: {
    type: String,
    required: true,
    index: true,
  },
  postoDestino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posto',
    required: true,
  },
  medicamento: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Medicamento',
  },
  farmaceutico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Funcionario',
  },
});

const pedido = mongoose.model('Pedido', pedidoSchema);

export default pedido;
