const fs = require('fs');
const { builtinModules } = require('module');
const path = require('path');
const { json } = require('stream/consumers');

async function agregarIdTimestampProd (carrito) {
    let listadoProductos = carrito.productos
    for (let i=0; i < listadoProductos.length; i++){
        carrito.productos[i].id = i+1
        carrito.productos[i].timestamp = Date.now()
    }
}

class CartJsonManger{
    
    constructor(archivo){
        this.pathToFileCart = archivo
    }

    async add (carrito) {
        if (!fs.existsSync(this.pathToFileCart)){
            carrito.id = 1;
            carrito.timestamp = Date.now()
            await agregarIdTimestampProd(carrito)
            await fs.promises.writeFile(this.pathToFileCart, JSON.stringify([carrito], null, 2));
            return {status: 200, message: "Carrito agregado con exito", id: carrito.id}
        } else {
            let carts = await fs.promises.readFile(this.pathToFileCart, 'utf-8');
            let newCarts = JSON.parse(carts);
            let id = newCarts[newCarts.length-1].id + 1;
            carrito.id = id;
            carrito.timestamp = Date.now()
            await agregarIdTimestampProd(carrito)
            newCarts.push(carrito);
            await fs.promises.writeFile(this.pathToFileCart, JSON.stringify(newCarts, null, 2));
            return {status: 200, message: "Carrito agregado con exito", id: carrito.id}
        } 

    }

    async deleteCartById (id) {

        if (fs.existsSync(this.pathToFileCart)){
            let data = await fs.promises.readFile(this.pathToFileCart, 'UTF-8')
            let carts = JSON.parse(data)
            let cartsId = carts.map(item => item.id)
            let idABuscar = parseInt(id)
            let indice = cartsId.indexOf(idABuscar)
            if(indice>-1){
                let newCarts = carts.filter(item => item.id != parseInt(id))
                await fs.promises.writeFile(this.pathToFileCart, JSON.stringify(newCarts, null, 2));
                {return {status: 200, message: `Carrito con id ${id} eliminado`} }
            }
            else { return {status: 404, message: "Carrito no encontrado"} }
        } else {
            return {status: 404, message: "Base de carritos no disponible"}
        } 

    }

    async listAll (id) {
        if (fs.existsSync(this.pathToFileCart)){
            let data = await fs.promises.readFile(this.pathToFileCart, 'UTF-8')
            let carts = JSON.parse(data)
            let cartsId = carts.map(item => item.id)
            let idABuscar = parseInt(id)
            let indice = cartsId.indexOf(idABuscar)
            if(indice>-1){
                {return {status: 200, message: carts[indice].productos} }
            }
            else { return {status: 404, message: "Carrito no encontrado"} }
        } else {
            return {status: 404, message: "Base de carritos no disponible"}
        } 
    }

    async addById (id, producto) {
        if (fs.existsSync(this.pathToFileCart)){
            let data = await fs.promises.readFile(this.pathToFileCart, 'UTF-8')
            let carts = JSON.parse(data)
            let cartsId = carts.map(item => item.id)
            let idABuscar = parseInt(id)
            let indice = cartsId.indexOf(idABuscar)
            if(indice>-1){
                producto.id = (carts[indice].productos[carts[indice].productos.length-1].id+1)
                producto.timestamp = Date.now()
                carts[indice].productos.push(producto)
                await fs.promises.writeFile(this.pathToFileCart, JSON.stringify(carts, null, 2));
                {return {status: 200, message: `Se agrego el producto al carrito id ${id}`} }
            }
            else { return {status: 404, message: "Carrito no encontrado"} }
        } else {
            return {status: 404, message: "Base de carritos no disponible"}
        }
    }

    async deleteProdById (idCart, idProd) {
        if (fs.existsSync(this.pathToFileCart)){
            let data = await fs.promises.readFile(this.pathToFileCart, 'UTF-8')
            let carts = JSON.parse(data)
            let cartsId = carts.map(item => item.id)
            let idABuscar = parseInt(idCart)
            let indice = cartsId.indexOf(idABuscar)
            if(indice>-1){
                let prodsId = carts[indice].productos.map(item => item.id)
                let idABuscarProd = parseInt(idProd)
                let indiceProd = prodsId.indexOf(idABuscarProd)
                if (indiceProd > -1){
                    let newProducts = carts[indice].productos.filter(item => item.id != parseInt(idProd))
                    carts[indice].productos = newProducts
                    await fs.promises.writeFile(this.pathToFileCart, JSON.stringify(carts, null, 2));
                    {return {status: 200, message: `Prod con id ${idProd} eliminado del carrito con id ${idCart}`} }
                } else { return {status: 404, message: "Producto no encontrado en el carrito"} }
            }
            else { return {status: 404, message: "Carrito no encontrado"} }
        } else {
            return {status: 404, message: "Base de carritos no disponible"}
        }
    }
        
}

module.exports = CartJsonManger