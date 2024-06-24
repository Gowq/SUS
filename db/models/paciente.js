import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  endereco: {
    type: String,
    required: true,
    trim: true,
  },
  convenioMedico: {
    type: String,
    required: true,
    trim: true,
  },
  idade: {
    type: Number,
    required: true,
  },
});

const paciente = mongoose.model('Paciente', pacienteSchema);

export default paciente;
