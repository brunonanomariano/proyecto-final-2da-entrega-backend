const {prods} = require('../config/fs.js')

class ProductFireBaseManager {

    async findAll () {
        const productos = []
        const snapshot = await prods.get()
        snapshot.forEach(doc => productos.push({id: doc.id, ...doc.data()}))
        if (productos.length > 0){
            return {status: 200, message: {productos}}
        } else {
            return {status: 404, message: "No hay productos en la base" }
        }
    }

    async findById (id) {
        const productos = []
        const snapshot = await prods.get()
        snapshot.forEach(doc => productos.push({id: doc.id, ...doc.data()}))
        if (productos.length > 0){
            const producto = productos.find(elemento => elemento.id === id)
            if (producto){
                return {status: 200, message: {producto}}
            } else {
                return {status: 404, message: `No hay productos en la base con id ${id}` }    
            }
        } else {
            return {status: 404, message: "No hay productos en la base" }
        }

    }

    async add (producto) {
        const prod = await prods.add(producto)
        return {status: 200, message: "Producto agregado con exito"}
    }

    async update (id, producto) {
        const productos = []
        const snapshot = await prods.get()
        snapshot.forEach(doc => productos.push({id: doc.id, ...doc.data()}))
        if (productos.length > 0){
            const product = productos.find(elemento => elemento.id === id)
            if (product){
                await prods.doc(id).update(producto)
                return {status: 200, message: `Producto con id ${id} actualizado con exito`}
            } else {
                return {status: 200, message: `Producto con id ${id} no encontrado`}    
            }
        } else {
            return {status: 404, message: "No hay productos en la base" }
        }
    }

    async delete (id) {
        const productos = []
        const snapshot = await prods.get()
        snapshot.forEach(doc => productos.push({id: doc.id, ...doc.data()}))
        if (productos.length > 0){
            const producto = productos.find(elemento => elemento.id === id)
            if (producto){
                await prods.doc(id).delete()
                return {status: 200, message: `Producto con id ${id} eliminado con exito`}
            } else {
                return {status: 200, message: `Producto con id ${id} no encontrado`}    
            }
        } else {
            return {status: 404, message: "No hay productos en la base" }
        }
        
    }
    
}

module.exports = ProductFireBaseManager
