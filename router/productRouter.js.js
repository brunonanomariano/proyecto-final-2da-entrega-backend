const express = require('express')
const { parse } = require('path')
const router = express.Router()
const ProductManager = require('../controllers/productManager.js')
require('../config/db.js')

let manejadorProductos = new ProductManager()
let isAdmin = true

router.get('/', (req, res) => {
    manejadorProductos.findAll()
        .then(result => res.status(result.status).send(result));
})

router.get('/:id', (req, res) => {
    let paramId = req.params.id
    manejadorProductos.findById(paramId)
            .then(result => res.status(result.status).send(result));
})

router.post('/', (req, res) => {

    if (!isAdmin){
        res.status(404).send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no autorizado`})    
    }
    else {
        if ((!req.body.nombre) || (!req.body.descripcion) || (!req.body.codigo) || 
            (!req.body.foto) || (!req.body.precio) || (!req.body.stock)) {
            res.status(400).send({status: 400, message: "No se recibieron todos los campos requeridos"})
        } else {
            manejadorProductos.add(req.body)
                .then(result => res.status(result.status).send(result));
        }
    }
    
})

router.put('/:id', (req, res) => {
    let paramId = req.params.id
    if (!isAdmin){
        res.status(404).send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no autorizado`})    
    }
    else {
        if ((!req.body.nombre) || (!req.body.descripcion) || (!req.body.codigo) || 
           (!req.body.foto) || (!req.body.precio) || (!req.body.stock)) {
            res.status(400).send({status: 400, message: "No se recibieron todos los campos requeridos"})
        } else {
            manejadorProductos.update(paramId, req.body)
                .then(result => res.status(result.status).send(result));
        }
        
    }
    
})

router.delete('/:id', (req, res) => {
    let paramId = req.params.id
    if (!isAdmin){
        res.status(404).send({error: -1, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no autorizado`})    
    }
    else {
        manejadorProductos.delete(paramId)
            .then(result => res.status(result.status).send(result));
    }

})


module.exports = router