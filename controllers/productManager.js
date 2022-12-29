const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const dotenv = require('dotenv')
dotenv.config()


let managerProducto

switch (process.env.PERSISTENCIA) {
    case "MONGO":
        const prodModel = require('../models/productosModel')
        const productMongoDAO = require('../daos/productMongoDAO')
        managerProducto = new productMongoDAO (prodModel)
        break
    case "JSON":
        const pathToFileProd = process.env.PRODJSON_URL
        const ProductoJsonDAO = require('../daos/productJSONDAO')
        managerProducto = new ProductoJsonDAO(pathToFileProd)
        break
    case "FIREBASE":
        const ProductFireBaseDAO = require('../daos/productFireBaseDAO')
        managerProducto = new ProductFireBaseDAO()
        break
    default:
        console.log("Medio de persistencia no reconocido")
        break
} 

class ProductManager {

    async findAll () {
        return await managerProducto.findAll()
    }

    async findById (id) {
        return await managerProducto.findById(id)

    }

    async add (producto) {

        return await managerProducto.add(producto)
        
    }

    async update (id, producto) {

        return await managerProducto.update(id, producto)
    
    }

    async delete (id) {

        return await managerProducto.delete(id)
    
    }

}

module.exports = ProductManager
