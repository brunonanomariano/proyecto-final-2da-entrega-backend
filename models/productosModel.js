const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productosCollection = "productos"

const productosSchema = new Schema({
    "nombre": {type: String, require: true, max: 100},
    "descripcion": {type: String, require: true, max: 100},
    "foto": {type: String, require: true, max: 200},
    "codigo": {type: Number, require: true},
    "precio": {type: Number, require: true},
    "stock": {type: Number, require: true}
},{timestamps:true}
)

const productosModel = mongoose.model(productosCollection, productosSchema)
module.exports = productosModel