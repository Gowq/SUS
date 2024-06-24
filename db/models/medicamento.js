import mongoose from "mongoose";

const medicamentoSchema = new mongoose.Schema({
    nome:{
        type:String,
        required: true,
    },
    codigo:{
        type: String,
        required: true,
    },
    preco:{
        type:Number,
        required:true,
    }
})

const medicamento = mongoose.model("Medicamento", medicamentoSchema);

export default medicamento;