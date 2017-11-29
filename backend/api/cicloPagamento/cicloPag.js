const restfull = require('node-restful');
const mongoose = restfull.mongoose

const creditSchema = new mongoose.Schema({
    name:{type:String, required: true},
    value: {type: Number, min:0, required: true }
});

const debitSchema = new mongoose.Schema({
    name:{type:String, required:true },
    value:{type:Number, min:0, required: [true, 'Informe o valor do debito']},
    status:{type: String, required: false, uppercase:true,
        enum:['PAGO','PENDENTE','AGENDADO'] 
    }
})  

const cicloPagSchema = new mongoose.Schema({
    name:{type:String, required: true },
    month: {type:Number, min:1, max:12, required: true},
    year: {type:Number, min: 1970, max:2100, required: true},
    credits: [creditSchema],
    debits:[debitSchema]
})

module.exports = restfull.model('cicloPag', cicloPagSchema)