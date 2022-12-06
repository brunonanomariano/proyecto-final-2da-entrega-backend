const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

const pathToFileProd = './data/products.json'

class ProductManager {

    async findAll () {
        if (fs.existsSync(pathToFileProd)){
            let data = await fs.promises.readFile(pathToFileProd, 'UTF-8')
            let prods = JSON.parse(data)
            return {status: 200, message: prods}
        } else {
            return {status: 404, message: "Base de productos no disponible"}
        }
    }

    async findById (id) {
        if (fs.existsSync(pathToFileProd)){
            let data = await fs.promises.readFile(pathToFileProd, 'UTF-8')
            let prods = JSON.parse(data)
            let prod = prods.find(item => item.id === parseInt(id))
            if (prod) {return {status: 200, message: prod} }
            else { return {status: 404, message: "Producto no encontrado"} } 
        } else {
            return {status: 404, message: "Base de productos no disponible"}
        } 
    }

    async add (producto) {

        if (!fs.existsSync(pathToFileProd)){
            producto.id = 1;
            producto.timestamp = Date.now()
            await fs.promises.writeFile(pathToFileProd, JSON.stringify([producto], null, 2));
            return {status: 200, message: "Producto agregado con exito"}
        } else {
            let products = await fs.promises.readFile(pathToFileProd, 'utf-8');
            let newProducts = JSON.parse(products);
            let id = newProducts[newProducts.length-1].id + 1;
            producto.id = id;
            producto.timestamp = Date.now()
            newProducts.push(producto);
            await fs.promises.writeFile(pathToFileProd, JSON.stringify(newProducts, null, 2));
            return {status: 200, message: "Producto agregado con exito"}
        } 
        
    }

    async update (id, producto) {
        if (fs.existsSync(pathToFileProd)){
            let data = await fs.promises.readFile(pathToFileProd, 'UTF-8')
            let prods = JSON.parse(data)
            let prodsId = prods.map(item => item.id)
            let idABuscar = parseInt(id)
            let indice = prodsId.indexOf(idABuscar)
            if (indice>-1) {
                prods[indice].nombre = producto.nombre
                prods[indice].descripcion = producto.descripcion
                prods[indice].foto = producto.foto
                prods[indice].codigo = producto.codigo
                prods[indice].stock = producto.stock
                await fs.promises.writeFile(pathToFileProd, JSON.stringify(prods, null, 2));
                return {status: 200, message: `Producto id ${id} actualizado`}
            }
            else { return {status: 404, message: "Producto no encontrado"} } 
        } else {
            return {status: 404, message: "Base de productos no disponible"}
        } 
    }

    async delete (id) {
        if (fs.existsSync(pathToFileProd)){
            let data = await fs.promises.readFile(pathToFileProd, 'UTF-8')
            let prods = JSON.parse(data)
            let prodsId = prods.map(item => item.id)
            let idABuscar = parseInt(id)
            let indice = prodsId.indexOf(idABuscar)
            if(indice>-1){
                let newProducts = prods.filter(item => item.id != parseInt(id))
                await fs.promises.writeFile(pathToFileProd, JSON.stringify(newProducts, null, 2));
                {return {status: 200, message: `Producto id ${id} eliminado`} }
            }
            else { return {status: 404, message: "Producto no encontrado"} }
        } else {
            return {status: 404, message: "Base de productos no disponible"}
        } 
    }

}

module.exports = ProductManager
