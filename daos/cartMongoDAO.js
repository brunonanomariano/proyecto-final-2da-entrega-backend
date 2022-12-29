const pathConfig = require('../config/db.js')
const cartModel = require('../models/cartModel.js')

class CartMongoManger{
    
    constructor(model){
        this.model = model
    }

    async add (carrito) {
        let cart = new this.model(carrito)
        cart.save()
        return {status: 200, message: "Carrito agregado con exito", id: carrito.id}
    }

    async deleteCartById (id) {
        try{
            let cart = await this.model.findOne( {_id: id } )
            if (!cart){
                return {status: 404, message: `No se ha encontrado el carrito con id ${id} en la base`}
            }
        }
        catch(err){
            return {status: 404, message: `No se ha encontrado el carrito con id ${id} en la base`}
        }

        const deletedById = await this.model.findByIdAndDelete(id);
        if (deletedById){
            return {status: 200, message: `Carrito con id ${id} eliminado`}
        } else {
            return {status: 404, message: "Carrito no encontrado"}
        }
    }

    async listAll (id) {
        try{
            let cart = await this.model.findOne( {_id: id } )
            if (cart){
                return {status: 200, message: cart}
            } else{
                return {status: 404, message: `No se ha encontrado el carrito con id ${id} en la base`}
            }
        }
        catch(err){
            return {status: 404, message: `No se ha encontrado el carrito con id ${id} en la base`}
        }


    }

    async addById (id, producto) {
        
        try{
            let cart = await this.model.findOne( {_id: id } )
            if (!cart){
                return {status: 404, message: `No se ha encontrado el carrito con id ${id} en la base`}
            }
        }
        catch(err){
            return {status: 404, message: `No se ha encontrado el carrito con id ${id} en la base`}
        }

        let carrito = await this.model.findOne( {_id: id } )
        let prods = carrito.productos

        prods.push(producto)

        let cart = await this.model.findByIdAndUpdate(id, {
            productos: prods
        })

        if (cart){
            return {status: 200, message: `Se agrego el producto al carrito id ${id} `}
        } else {
            return {status: 404, message: `No se ha encontrado el carrito con id ${id} en la base`} 
        }
          
    }

    async deleteProdById (idCart, idProd) {
    
        try{
            let cart = await this.model.findOne( {_id: idCart } )
            if (!cart){
                return {status: 404, message: `No se ha encontrado el carrito con id ${idCart} en la base`}
            }
        }
        catch(err){
            return {status: 404, message: `No se ha encontrado el carrito con id ${idCart} en la base`}
        }

        let carrito = await this.model.findOne( {_id: idCart } )
        let prods = carrito.productos
        if ( prods.length > 0 ){
            let prodEncontrado = prods.filter(element => element._id == idProd)
            console.log(prodEncontrado)
            if (prodEncontrado.length === 0){
                return {status: 404, message: `No se ha encontrado el producto con id ${idProd} en el carrito ${idCart}`}
            }
        } else {
            return {status: 404, message: `No se ha encontrado el producto con id ${idProd} en el carrito ${idCart}`} 
        }
        

        let newProds = prods.filter(element => element._id != idProd)

        let cart = await this.model.findByIdAndUpdate(idCart, {
            productos: newProds
        })

        if (cart){
            return {status: 200, message: `Se elimino el producto id ${idProd} del carrito ${idCart} `}
        } else {
            return {status: 404, message: `No se ha encontrado el producto con id ${idProd} en el carrito ${idCart}`} 
        }

    }
        
}

module.exports = CartMongoManger