const pathConfig = require('../config/db.js')
const productosModel = require('../models/productosModel.js')


class ProductMongoManager {
    constructor(model){
        this.model = model
    }

    async findAll () {
        let productos = await this.model.find({})
        if (productos.length > 0){
            return {status: 200, message: productos}
        } else{
            return {status: 404, message: "No hay productos en la base" }
        }
    }

    async findById (id) {
        try{
            let producto = await this.model.findOne( {_id: id } )
            if (producto){
                return {status: 200, message: producto}
            } else{
                return {status: 404, message: `No se ha encontrado el producto con id ${id} en la base`}
            }
        }
        catch(err){
            return {status: 404, message: `No se ha encontrado el producto con id ${id} en la base`}
        }

    }

    async add (producto) {
        let prod = new this.model(producto)
        prod.save();
        return {status: 200, message: "Producto agregado con exito"}        
    }

    async update (id, producto) {
        try{
            let prod = await this.model.findOne( {_id: id } )
            if (!prod){
                return {status: 404, message: `No se ha encontrado el producto con id ${id} en la base`}
            }
        }
        catch(err){
            return {status: 404, message: `No se ha encontrado el producto con id ${id} en la base`}
        }

        let prod = await this.model.findByIdAndUpdate(id, {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            foto: producto.foto,
            codigo: producto.codigo,
            precio: producto.precio,
            stock: producto.stock
          })
    
        if (prod){
            return {status: 200, message: `Producto id ${id} actualizado`}
        } else {
            return {status: 404, message: `No se ha encontrado el producto con id ${id} en la base`} 
        }
    
    }

    async delete (id) {

        try{
            let prod = await this.model.findOne( {_id: id } )
            if (!prod){
                return {status: 404, message: `No se ha encontrado el producto con id ${id} en la base`}
            }
        }
        catch(err){
            return {status: 404, message: `No se ha encontrado el producto con id ${id} en la base`}
        }
        
        const deletedById = await this.model.findByIdAndDelete(id);
        if (deletedById){
            return {status: 200, message: `Producto id ${id} eliminado`}
        } else {
            return {status: 404, message: "Producto no encontrado"}
        }

    }
    
}

module.exports = ProductMongoManager