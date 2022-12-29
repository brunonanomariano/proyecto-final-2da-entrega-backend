const {carts} = require('../config/fs.js')

async function agregarIdTimestampProd (carrito) {
    let listadoProductos = carrito.productos
    for (let i=0; i < listadoProductos.length; i++){
        carrito.productos[i].id = i+1
        carrito.productos[i].timestamp = Date.now()
    }
}

class CartFireBaseManger{
    
    async add (carrito) {
        carrito.timestamp = Date.now()
        agregarIdTimestampProd (carrito)
        const carritos = await carts.add(carrito)
        return {status: 200, message: "Carrito agregado con exito"}
    }

    async deleteCartById (id) {

        const carritos = []
        const snapshot = await carts.get()
        snapshot.forEach(doc => carritos.push({id: doc.id, ...doc.data()}))
        if (carritos.length > 0){
            const carrito = carritos.find(elemento => elemento.id === id)
            if (carrito){
                await carts.doc(id).delete()
                return {status: 200, message: `Carritos con id ${id} eliminado con exito`}
            } else {
                return {status: 200, message: `Carrito con id ${id} no encontrado`}    
            }
        } else {
            return {status: 404, message: "No hay carritos en la base" }
        }

    }

    async listAll (id) {

        const carritos = []
        const snapshot = await carts.get()
        snapshot.forEach(doc => carritos.push({id: doc.id, ...doc.data()}))
        if (carritos.length > 0){
            const carrito = carritos.find(elemento => elemento.id === id)
            if (carrito){
                return {status: 200, message: carrito}
            } else {
                return {status: 200, message: `Carrito con id ${id} no encontrado`}    
            }
        } else {
            return {status: 404, message: "No hay carritos en la base" }
        }

    }

    async addById (id, producto) {

        const carritos = []
        const snapshot = await carts.get()
        snapshot.forEach(doc => carritos.push({id: doc.id, ...doc.data()}))
        if (carritos.length > 0){
            const carrito = carritos.find(elemento => elemento.id === id)
            if (carrito){
                let newProds = carrito.productos
                producto.id = newProds[newProds.length-1].id + 1
                producto.timestamp = Date.now()
                newProds.push(producto)
                carts.doc(id).update({productos: newProds})
                return {status: 200, message: `Producto agregado al carriito con id ${id} con exito`}
            } else {
                return {status: 200, message: `Carrito con id ${id} no encontrado`}    
            }
        } else {
            return {status: 404, message: "No hay carritos en la base" }
        }
        
    }

    async deleteProdById (idCart, idProd) {
        const carritos = []
        const snapshot = await carts.get()
        snapshot.forEach(doc => carritos.push({id: doc.id, ...doc.data()}))
        if (carritos.length > 0){
            const carrito = carritos.find(elemento => elemento.id === idCart)
            if (carrito){
                let idProductos = carrito.productos.map(elemento => elemento.id)
                let indiceProductoAEliminar = idProductos.indexOf(parseInt(idProd))
                if (indiceProductoAEliminar > -1 ){
                    let newProds = carrito.productos.filter(elemento => elemento.id != idProd)
                    carts.doc(idCart).update({productos: newProds})
                    return {status: 200, message: `Se ha eliminado el producto con id ${idProd} del carrito con id ${idCart}`}
                } else {
                    return {status: 404, message: `No se encuentra el producto con id ${idProd} dentro del carrito con id ${idCart}`} 
                }
                
            } else {
                return {status: 404, message: `Carrito con id ${idCart} no encontrado`}    
            }
        } else {
            return {status: 404, message: "No hay carritos en la base" }
        }
    }
        
}

module.exports = CartFireBaseManger