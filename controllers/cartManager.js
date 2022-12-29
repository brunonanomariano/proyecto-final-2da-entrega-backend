const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const dotenv = require('dotenv')
dotenv.config()

let managerCarrito

switch (process.env.PERSISTENCIA) {
    case "MONGO":
        const cartModel = require('../models/cartModel')
        const cartMongoDAO = require('../daos/cartMongoDAO')
        managerCarrito = new cartMongoDAO (cartModel)
        break
    case "JSON":
        const pathToFileCart = process.env.CARTJSON_URL
        const CartJsonDAO = require('../daos/cartJSONDAO')
        managerCarrito = new CartJsonDAO(pathToFileCart)
        break
    case "FIREBASE":
        const CartFireBaseDAO = require('../daos/cartFireBaseDAO')
        managerCarrito = new CartFireBaseDAO()
        break
    default:
        console.log("Medio de persistencia no reconocido")
        break
}  

//Descomentar el metodo que deba usarse

//Utilizando Mongo
//const managerCarrito = new cartMongoDAO (cartModel)

//Utilizando Json
//const managerCarrito = new CartJsonDAO(pathToFileCart)

//Utilizando FireBase


class CartManager {

    async add (carrito) {
        return await managerCarrito.add(carrito)        
    }

    async deleteCartById (id) {

        return await managerCarrito.deleteCartById(id) 

    }

    async listAll (id) {

        return await managerCarrito.listAll(id) 

    }

    async addById (id, producto) {

        return await managerCarrito.addById(id, producto) 
    
    }

    async deleteProdById (idCart, idProd) {

        return await managerCarrito.deleteProdById(idCart, idProd) 
    
    }

}

module.exports = CartManager