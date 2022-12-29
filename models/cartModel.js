const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carritoCollection = "carrito"

const carritoSchema = new Schema({
    "productos": [{
        "nombre": {type: String, require: true, max: 100},
        "descripcion": {type: String, require: true, max: 100},
        "foto": {type: String, require: true, max: 200},
        "codigo": {type: Number, require: true},
        "precio": {type: Number, require: true},
        "stock": {type: Number, require: true}
    },{timestamps:true}]
},{timestamps:true}
)

const carritoModel = mongoose.model(carritoCollection, carritoSchema)
module.exports = carritoModel